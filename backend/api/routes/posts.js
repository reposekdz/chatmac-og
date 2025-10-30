const express = require('express');
const router = express.Router();
const db = require('../../db');

// A helper function to enrich posts with user details and stats
const enrichPosts = async (posts, userId = 0) => {
    const postIds = posts.map(p => p.id);
    if (postIds.length === 0) return [];

    const [likes] = await db.query(`SELECT post_id, COUNT(*) as count FROM post_likes WHERE post_id IN (?) GROUP BY post_id`, [postIds]);
    const [comments] = await db.query(`SELECT post_id, COUNT(*) as count FROM comments WHERE post_id IN (?) GROUP BY post_id`, [postIds]);
    const [userLikes] = await db.query(`SELECT post_id FROM post_likes WHERE post_id IN (?) AND user_id = ?`, [postIds, userId]);
    const [userBookmarks] = await db.query(`SELECT post_id FROM bookmarks WHERE post_id IN (?) AND user_id = ?`, [postIds, userId]);
    
    const likesMap = new Map(likes.map(l => [l.post_id, l.count]));
    const commentsMap = new Map(comments.map(c => [c.post_id, c.count]));
    const userLikesSet = new Set(userLikes.map(l => l.post_id));
    const userBookmarksSet = new Set(userBookmarks.map(b => b.post_id));

    return posts.map(post => ({
        ...post,
        likes_count: likesMap.get(post.id) || 0,
        comments_count: commentsMap.get(post.id) || 0,
        is_liked_by_user: userLikesSet.has(post.id),
        is_bookmarked_by_user: userBookmarksSet.has(post.id),
    }));
};

// GET /api/posts - Fetch all posts for the feed
router.get('/', async (req, res) => {
    const userId = req.query.userId || 0;
    try {
        const [posts] = await db.query(`
            SELECT 
                p.id, p.content, p.image_url, p.created_at, p.latitude, p.longitude, p.share_count, p.original_post_id,
                JSON_OBJECT('id', u.id, 'name', u.name, 'handle', u.handle, 'avatar', u.avatar) as user
            FROM posts p
            JOIN users u ON p.user_id = u.id
            ORDER BY p.created_at DESC
            LIMIT 50;
        `);
        const enrichedPosts = await enrichPosts(posts, userId);
        res.json(enrichedPosts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Error fetching posts" });
    }
});

// GET /api/posts/geotagged
router.get('/geotagged', async (req, res) => {
    try {
        const [posts] = await db.query(`
            SELECT 
                p.id, p.content, p.image_url, p.created_at, p.latitude, p.longitude,
                JSON_OBJECT('id', u.id, 'name', u.name, 'handle', u.handle, 'avatar', u.avatar) as user
            FROM posts p
            JOIN users u ON p.user_id = u.id
            WHERE p.latitude IS NOT NULL AND p.longitude IS NOT NULL
            ORDER BY p.created_at DESC
            LIMIT 20;
        `);
         res.json(posts); // Not enriching for simplicity on this endpoint
    } catch (error) {
         console.error("Error fetching geotagged posts:", error);
        res.status(500).json({ message: "Error fetching geotagged posts" });
    }
});

// GET /api/posts/user/:handle
router.get('/user/:handle', async (req, res) => {
    const { handle } = req.params;
    const userId = req.query.userId || 0;
    try {
        const [posts] = await db.query(`
            SELECT 
                p.id, p.content, p.image_url, p.created_at, p.latitude, p.longitude,
                JSON_OBJECT('id', u.id, 'name', u.name, 'handle', u.handle, 'avatar', u.avatar) as user
            FROM posts p
            JOIN users u ON p.user_id = u.id
            WHERE u.handle = ?
            ORDER BY p.created_at DESC
            LIMIT 50;
        `, [handle.startsWith('@') ? handle.substring(1) : handle]);
        const enrichedPosts = await enrichPosts(posts, userId);
        res.json(enrichedPosts);
    } catch (error) {
        console.error("Error fetching user posts:", error);
        res.status(500).json({ message: "Error fetching user posts" });
    }
});

// POST /api/posts - Create a new post
router.post('/', async (req, res) => {
    const { userId, content, imageUrl, pollOptions } = req.body;
    if (!userId || !content) {
        return res.status(400).json({ message: "User ID and content are required." });
    }
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        const [result] = await connection.query(
            'INSERT INTO posts (user_id, content, image_url) VALUES (?, ?, ?)',
            [userId, content, imageUrl || null]
        );
        // Poll logic would be added here if needed
        await connection.commit();
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        await connection.rollback();
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Error creating post" });
    } finally {
        connection.release();
    }
});

// POST /api/posts/:id/like - Like/unlike a post
router.post('/:id/like', async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: 'User ID is required' });

    try {
        const [[existing]] = await db.query('SELECT id FROM post_likes WHERE post_id = ? AND user_id = ?', [postId, userId]);
        if (existing) {
            await db.query('DELETE FROM post_likes WHERE id = ?', [existing.id]);
            res.json({ liked: false });
        } else {
            await db.query('INSERT INTO post_likes (post_id, user_id) VALUES (?, ?)', [postId, userId]);
            
            // Send notification
            const [[post]] = await db.query('SELECT user_id FROM posts WHERE id = ?', [postId]);
            if (post && post.user_id !== userId) {
                 const io = req.app.get('io');
                 const socketManager = require('../../services/socketManager');
                 const recipientSocketId = socketManager.getSocketId(post.user_id);
                 if (recipientSocketId) {
                    const [[actor]] = await db.query('SELECT name, handle, avatar FROM users WHERE id = ?', [userId]);
                    const notification = { type: 'like', actor, post: { id: postId }, content: 'liked your post' };
                    io.to(recipientSocketId).emit('newNotification', notification);
                 }
            }
            res.json({ liked: true });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error liking post' });
    }
});

// POST /api/posts/:id/bookmark
router.post('/:id/bookmark', async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: 'User ID is required' });

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

// GET /api/posts/:id/comments
router.get('/:id/comments', async (req, res) => {
    const postId = req.params.id;
    try {
        const [comments] = await db.query(`
            SELECT c.*, JSON_OBJECT('id', u.id, 'name', u.name, 'handle', u.handle, 'avatar', u.avatar) as user
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.post_id = ? 
            ORDER BY c.created_at DESC
        `, [postId]);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments' });
    }
});

// POST /api/posts/:id/comments
router.post('/:id/comments', async (req, res) => {
    const postId = req.params.id;
    const { userId, content } = req.body;
    if (!userId || !content) return res.status(400).json({ message: 'User ID and content are required' });
    try {
        const [result] = await db.query('INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)', [postId, userId, content]);
        const [[comment]] = await db.query(`
             SELECT c.*, JSON_OBJECT('id', u.id, 'name', u.name, 'handle', u.handle, 'avatar', u.avatar) as user
             FROM comments c
             JOIN users u ON c.user_id = u.id
             WHERE c.id = ?
        `, [result.insertId]);
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating comment' });
    }
});

// POST /api/posts/:id/share
router.post('/:id/share', async (req, res) => {
    const { userId } = req.body;
    const postId = req.params.id;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // Increment share count on original post
        await connection.query('UPDATE posts SET share_count = share_count + 1 WHERE id = ?', [postId]);

        // Create a new post for the user who shared it
        const [result] = await connection.query(
            'INSERT INTO posts (user_id, content, original_post_id) VALUES (?, ?, ?)',
            [userId, `Shared a post`, postId]
        );

        await connection.commit();
        res.status(201).json({ message: 'Post shared successfully', newPostId: result.insertId });

    } catch (error) {
        await connection.rollback();
        console.error("Error sharing post:", error);
        res.status(500).json({ message: "Error sharing post" });
    } finally {
        connection.release();
    }
});


module.exports = router;
