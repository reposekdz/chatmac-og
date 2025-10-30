const express = require('express');
const router = express.Router();
const db = require('../../db');

// GET /api/reels - Fetch all reels
router.get('/', async (req, res) => {
    try {
        const [reels] = await db.query(`
            SELECT 
                r.*,
                JSON_OBJECT('id', u.id, 'name', u.name, 'handle', u.handle, 'avatar', u.avatar) as user
            FROM reels r
            JOIN users u ON r.user_id = u.id
            ORDER BY r.created_at DESC;
        `);
        res.json(reels);
    } catch (error) {
        console.error("Error fetching reels:", error);
        res.status(500).json({ message: "Error fetching reels" });
    }
});

// POST /api/reels - Create a new reel
router.post('/', async (req, res) => {
    const { userId, videoUrl, caption } = req.body;
    if (!userId || !videoUrl) {
        return res.status(400).json({ message: "User ID and video URL are required" });
    }
    try {
        const [result] = await db.query(
            'INSERT INTO reels (user_id, video_url, caption) VALUES (?, ?, ?)',
            [userId, videoUrl, caption]
        );
        res.status(201).json({ id: result.insertId, user_id: userId, video_url: videoUrl, caption });
    } catch (error) {
        console.error("Error creating reel:", error);
        res.status(500).json({ message: "Error creating reel" });
    }
});

module.exports = router;