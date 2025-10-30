
const express = require('express');
const router = express.Router();
const db = require('../../db');

// GET /api/bookmarks?userId=... - Get all bookmarks for a user
router.get('/', async (req, res) => {
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    try {
        const query = `
            SELECT 
                p.id, p.content, p.image_url, p.created_at, p.latitude, p.longitude,
                JSON_OBJECT('id', u.id, 'name', u.name, 'handle', u.handle, 'avatar', u.avatar) as user,
                (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) as likes_count,
                (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comments_count,
                (SELECT COUNT(*) > 0 FROM post_likes WHERE post_id = p.id AND user_id = ?) as is_liked_by_user,
                TRUE as is_bookmarked_by_user
            FROM bookmarks b
            JOIN posts p ON b.post_id = p.id
            JOIN users u ON p.user_id = u.id
            WHERE b.user_id = ?
            ORDER BY b.created_at DESC;
        `;
        const [posts] = await db.query(query, [userId, userId]);
        res.json(posts);
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
        res.status(500).json({ message: "Error fetching bookmarks" });
    }
});

module.exports = router;
