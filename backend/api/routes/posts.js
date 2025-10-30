
const express = require('express');
const router = express.Router();
const db = require('../../db');
const achievements = require('../../services/achievements');

const getFullPostQuery = `
    SELECT 
        p.id, p.content, p.image_url, p.created_at, p.latitude, p.longitude,
        JSON_OBJECT('id', u.id, 'name', u.name, 'handle', u.handle, 'avatar', u.avatar, 'isVerified', u.is_verified, 'status_emoji', u.status_emoji) as user,
        (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) as likes_count,
        (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comments_count,
        (SELECT COUNT(*) > 0 FROM post_likes WHERE post_id = p.id AND user_id = ?) as is_liked_by_user,
        (SELECT COUNT(*) > 0 FROM bookmarks WHERE post_id = p.id AND user_id = ?) as is_bookmarked_by_user,
        p.poll_id
    FROM posts p
    JOIN users u ON p.user_id = u.id
`;

const getPollData = async (connection, pollId, userId) => {
    if (!pollId) return null;
    const [[poll]] = await connection.query('SELECT * FROM polls WHERE id = ?', [pollId]);
    if (!poll) return null;

    const [options] = await connection.query(`
        SELECT po.id, po.text, COUNT(pv.id) as vote_count
        FROM poll_options po
        LEFT JOIN poll_votes pv ON po.id = pv.option_id
        WHERE po.poll_id = ?
        GROUP BY po.id
    `, [pollId]);

    const [[userVote]] = await connection.query('SELECT option_id FROM poll_votes WHERE poll_id = ? AND user_id = ?', [pollId, userId]);

    const totalVotes = options.reduce((sum, opt) => sum + opt.vote_count, 0);

    return {
        id: poll.id,
        options: options,
        total_votes: totalVotes,
        user_vote: userVote ? userVote.option_id : undefined,
    };
};

// GET /api/posts - Fetch posts
router.get('/', async (req, res) => {
    const userId = req.query.userId || 0;
    try {
        let finalQuery = getFullPostQuery;
        const params = [userId, userId];

        if (req.query.user_id) {
            finalQuery += ' WHERE p.user_id = ? ORDER BY p.created_at DESC';
            params.push(req.query.user_id);
        } else {
            finalQuery += ' ORDER BY p.created_at DESC';
        }

        const [posts] = await db.query(finalQuery, params);

        for (const post of posts) {
            post.poll = await getPollData(db, post.poll_id, userId);
        }

        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Error fetching posts" });
    }
});


// POST /api/posts - Create a new post
router.post('/', async (req, res) => {
    const { userId, content, imageUrl, latitude, longitude, pollOptions } = req.body;
    if (!userId || !content) {
        return res.status(400).json({ message: 'User ID and content are required.' });
    }

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        let pollId = null;
        if (pollOptions && pollOptions.length > 1) {
            const [pollResult] = await connection.query('INSERT INTO polls (user_id) VALUES (?)', [userId]);
            pollId = pollResult.insertId;
            for (const optionText of pollOptions) {
                if(optionText.trim()){
                    await connection.query('INSERT INTO poll_options (poll_id, text) VALUES (?, ?)', [pollId, optionText.trim()]);
                }
            }
        }
        
        const [result] = await connection.query(
            'INSERT INTO posts (user_id, content, image_url, latitude, longitude, poll_id) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, content, imageUrl, latitude, longitude, pollId]
        );
        const postId = result.insertId;

        const [[newPost]] = await connection.query(`${getFullPostQuery} WHERE p.id = ?`, [userId, userId, postId]);
        newPost.poll = await getPollData(connection, pollId, userId);
        
        const unlockedAchievement = await achievements.checkForPostAchievements(userId, connection);

        await connection.commit();
        res.status(201).json({ post: newPost, achievement: unlockedAchievement });
    } catch (error) {
        await connection.rollback();
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Error creating post" });
    } finally {
        connection.release();
    }
});

// GET /api/posts/geotagged
router.get('/geotagged', async (req, res) => {
    try {
        const [posts] = await db.query(`
            SELECT p.id, p.content, p.latitude, p.longitude, JSON_OBJECT('id', u.id, 'avatar', u.avatar) as user
            FROM posts p
            JOIN users u ON p.user_id = u.id
            WHERE p.latitude IS NOT NULL AND p.longitude IS NOT NULL
            ORDER BY p.created_at DESC
            LIMIT 50;
        `);
        res.json(posts);
    } catch (error) {
        console.error("Error fetching geotagged posts:", error);
        res.status(500).json({ message: "Error fetching geotagged posts" });
    }
});

// GET /api/posts/:id/comments
router.get('/:id/comments', async (req, res) => {
    try {
        const [comments] = await db.query(`
            SELECT c.id, c.content, c.created_at, JSON_OBJECT('id', u.id, 'name', u.name, 'handle', u.handle, 'avatar', u.avatar) as user
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.post_id = ?
            ORDER BY c.created_at DESC
        `, [req.params.id]);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments' });
    }
});

// POST /api/posts/:id/comments
router.post('/:id/comments', async (req, res) => {
    const { userId, content } = req.body;
    try {
        const [result] = await db.query('INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)', [req.params.id, userId, content]);
        const [[newComment]] = await db.query(`
            SELECT c.id, c.content, c.created_at, JSON_OBJECT('id', u.id, 'name', u.name, 'handle', u.handle, 'avatar', u.avatar) as user
            FROM comments c JOIN users u ON c.user_id = u.id WHERE c.id = ?
        `, [result.insertId]);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Error posting comment' });
    }
});


// POST /api/posts/:id/like
router.post('/:id/like', async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    try {
        const [[existing]] = await db.query('SELECT id FROM post_likes WHERE post_id = ? AND user_id = ?', [postId, userId]);
        if (existing) {
            await db.query('DELETE FROM post_likes WHERE id = ?', [existing.id]);
            res.json({ liked: false });
        } else {
            await db.query('INSERT INTO post_likes (post_id, user_id) VALUES (?, ?)', [postId, userId]);
            res.json({ liked: true });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error liking post' });
    }
});

// POST /api/posts/:id/bookmark
router.post('/:id/bookmark', async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    try {
        const [[existing]] = await db.query('SELECT id FROM bookmarks WHERE post_id = ? AND user_id = ?', [postId, userId]);
        if (existing) {
            await db.query('DELETE FROM bookmarks WHERE id = ?', [existing.id]);
            res.json({ bookmarked: false });
        } else {
            await db.query('INSERT INTO bookmarks (post_id, user_id) VALUES (?, ?)', [postId, userId]);
            res.json({ bookmarked: true });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error bookmarking post' });
    }
});

// POST /api/posts/poll/:pollId/vote
router.post('/poll/:pollId/vote', async (req, res) => {
    const { pollId } = req.params;
    const { userId, optionId } = req.body;
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        // Remove previous vote if exists
        await connection.query('DELETE FROM poll_votes WHERE poll_id = ? AND user_id = ?', [pollId, userId]);
        // Add new vote
        await connection.query('INSERT INTO poll_votes (poll_id, user_id, option_id) VALUES (?, ?, ?)', [pollId, userId, optionId]);
        
        const newPollData = await getPollData(connection, pollId, userId);
        
        await connection.commit();
        res.json(newPollData);
    } catch (error) {
        await connection.rollback();
        console.error("Error voting on poll:", error);
        res.status(500).json({ message: "Error voting on poll" });
    } finally {
        connection.release();
    }
});

module.exports = router;
