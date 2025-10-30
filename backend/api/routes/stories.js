const express = require('express');
const router = express.Router();
const db = require('../../db');

// GET /api/stories - Fetch stories for the reel
router.get('/', async (req, res) => {
    const { userId } = req.query; // Get stories from people the user follows
    try {
        // Simple query for now, can be expanded to a proper feed algorithm
        const [stories] = await db.query(`
            SELECT 
                s.id, s.image_url, s.created_at,
                (SELECT COUNT(*) FROM story_likes WHERE story_id = s.id) as likes_count,
                (SELECT COUNT(*) FROM story_comments WHERE story_id = s.id) as comments_count,
                (SELECT COUNT(*) > 0 FROM story_likes WHERE story_id = s.id AND user_id = ?) as is_liked_by_user,
                JSON_OBJECT('id', u.id, 'name', u.name, 'handle', u.handle, 'avatar', u.avatar) as user
            FROM stories s
            JOIN users u ON s.user_id = u.id
            WHERE s.created_at >= NOW() - INTERVAL 1 DAY
            ORDER BY s.created_at DESC;
        `, [userId || 0]);
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
        return res.status(400).json({ message: "User ID and Image URL are required" });
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

// POST /api/stories/:id/like
router.post('/:id/like', async (req, res) => {
    const storyId = req.params.id;
    const { userId } = req.body;
    try {
        await db.query('INSERT INTO story_likes (story_id, user_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE story_id=story_id', [storyId, userId]);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ message: 'Error liking story' });
    }
});

// GET /api/stories/:id/comments
router.get('/:id/comments', async (req, res) => {
    const storyId = req.params.id;
    try {
        const [comments] = await db.query(`
            SELECT sc.*, JSON_OBJECT('id', u.id, 'name', u.name, 'avatar', u.avatar) as user 
            FROM story_comments sc
            JOIN users u ON sc.user_id = u.id
            WHERE story_id = ? 
            ORDER BY created_at DESC
        `, [storyId]);
        res.json(comments);
    } catch (error) {
         res.status(500).json({ message: 'Error fetching story comments' });
    }
});


// POST /api/stories/:id/comments
router.post('/:id/comments', async (req, res) => {
    const storyId = req.params.id;
    const { userId, content } = req.body;
    try {
        const [result] = await db.query('INSERT INTO story_comments (story_id, user_id, content) VALUES (?, ?, ?)', [storyId, userId, content]);
        const [[comment]] = await db.query('SELECT sc.*, JSON_OBJECT(\'id\', u.id, \'name\', u.name, \'avatar\', u.avatar) as user FROM story_comments sc JOIN users u ON sc.user_id = u.id WHERE sc.id = ?', [result.insertId]);
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error posting comment' });
    }
});


module.exports = router;
