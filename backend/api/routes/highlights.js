const express = require('express');
const router = express.Router();
const db = require('../../db');

// GET /api/highlights/user/:userId - Get all highlights for a user
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const [highlights] = await db.query(
            'SELECT * FROM highlights WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );
        // In a real app, you would also fetch the stories for each highlight
        res.json(highlights);
    } catch (error) {
        console.error("Error fetching highlights:", error);
        res.status(500).json({ message: "Error fetching highlights" });
    }
});

module.exports = router;
