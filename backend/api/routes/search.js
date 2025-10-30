const express = require('express');
const router = express.Router();
const db = require('../../db');

// GET /api/search?q=... - Search for users and posts
router.get('/', async (req, res) => {
    const { q } = req.query;
    if (!q || q.length < 2) {
        return res.json({ users: [], posts: [] });
    }

    try {
        const searchQuery = `%${q}%`;
        
        const [users] = await db.query(
            "SELECT id, name, handle, avatar FROM users WHERE name LIKE ? OR handle LIKE ? LIMIT 5",
            [searchQuery, searchQuery]
        );

        const [posts] = await db.query(
            `SELECT p.id, p.content, JSON_OBJECT('id', u.id, 'name', u.name, 'handle', u.handle, 'avatar', u.avatar) as user 
             FROM posts p 
             JOIN users u ON p.user_id = u.id 
             WHERE p.content LIKE ? 
             ORDER BY p.created_at DESC 
             LIMIT 5`,
            [searchQuery]
        );
        
        res.json({ users, posts });

    } catch (error) {
        console.error("Error performing search:", error);
        res.status(500).json({ message: "Error performing search" });
    }
});

module.exports = router;
