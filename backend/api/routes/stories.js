
const express = require('express');
const router = express.Router();
const db = require('../../db');

// GET /api/stories - Fetch stories from the last 24 hours
router.get('/', async (req, res) => {
    const userId = req.query.userId || 0;
    try {
        const [stories] = await db.query(`
            SELECT 
                s.id, s.image_url as imageUrl, s.created_at,
                JSON_OBJECT('id', u.id, 'name', u.name, 'avatar', u.avatar) as user,
                (SELECT COUNT(*) FROM story_likes WHERE story_id = s.id) as likes_count,
                (SELECT COUNT(*) FROM story_comments WHERE story_id = s.id) as comments_count,
                (SELECT COUNT(*) FROM story_likes WHERE story_id = s.id AND user_id = ?) > 0 as is_liked_by_user
            FROM stories s
            JOIN users u ON s.user_id = u.id
            WHERE s.created_at >= NOW() - INTERVAL 1 DAY
            ORDER BY s.created_at DESC;
        `, [userId]);
        res.json(stories);
    } catch (error) {
        console.error("Error fetching stories:", error);
        res.status(500).json({ message: "Error fetching stories" });
    }
});

// POST /api/stories - Create a new story
router.post('/', async (req, res) => {
    const { userId, imageUrl } = req.body;
    if (!userId || !imageUrl) {
        return res.status(400).json({ message: "User ID and image URL are required" });
    }
    try {
        const [result] = await db.query(
            'INSERT INTO stories (user_id, image_url) VALUES (?, ?)',
            [userId, imageUrl]
        );
        res.status(201).json({ id: result.insertId, user_id: userId, image_url: imageUrl });
    } catch (error) {
        console.error("Error creating story:", error);
        res.status(500).json({ message: "Error creating story" });
    }
});

// POST /api/stories/:id/like - Like or unlike a story
router.post('/:id/like', async (req, res) => {
    const storyId = req.params.id;
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: 'User ID is required' });

    try {
        const [[existingLike]] = await db.query('SELECT id FROM story_likes WHERE story_id = ? AND user_id = ?', [storyId, userId]);

        if (existingLike) {
            // Unlike
            await db.query('DELETE FROM story_likes WHERE id = ?', [existingLike.id]);
            res.json({ message: 'Story unliked' });
        } else {
            // Like
            await db.query('INSERT INTO story_likes (story_id, user_id) VALUES (?, ?)', [storyId, userId]);
            res.json({ message: 'Story liked' });
        }
    } catch (error) {
        console.error("Error liking/unliking story:", error);
        res.status(500).json({ message: "Error updating like status" });
    }
});

// GET /api/stories/:id/comments - Get comments for a story
router.get('/:id/comments', async (req, res) => {
    const storyId = req.params.id;
    try {
        const [comments] = await db.query(`
            SELECT
                sc.id, sc.content, sc.created_at,
                JSON_OBJECT('id', u.id, 'name', u.name, 'avatar', u.avatar, 'handle', u.handle) as user
            FROM story_comments sc
            JOIN users u ON sc.user_id = u.id
            WHERE sc.story_id = ?
            ORDER BY sc.created_at DESC
        `, [storyId]);
        res.json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "Error fetching comments" });
    }
});

// POST /api/stories/:id/comments - Add a comment to a story
router.post('/:id/comments', async (req, res) => {
    const storyId = req.params.id;
    const { userId, content } = req.body;
    if (!userId || !content) return res.status(400).json({ message: 'User ID and content are required' });

    try {
        const [result] = await db.query(
            'INSERT INTO story_comments (story_id, user_id, content) VALUES (?, ?, ?)',
            [storyId, userId, content]
        );
        const [[newComment]] = await db.query(`
            SELECT
                sc.id, sc.content, sc.created_at,
                JSON_OBJECT('id', u.id, 'name', u.name, 'avatar', u.avatar, 'handle', u.handle) as user
            FROM story_comments sc
            JOIN users u ON sc.user_id = u.id
            WHERE sc.id = ?
        `, [result.insertId]);

        res.status(201).json(newComment);
    } catch (error) {
        console.error("Error posting comment:", error);
        res.status(500).json({ message: "Error posting comment" });
    }
});

module.exports = router;
