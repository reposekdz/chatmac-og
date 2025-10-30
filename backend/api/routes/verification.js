
const express = require('express');
const router = express.Router();
const db = require('../../db');

// POST /api/verification - Submit a verification application
router.post('/', async (req, res) => {
    const { userId, reason } = req.body;
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    try {
        await db.query(
            'INSERT INTO verification_applications (user_id, reason) VALUES (?, ?)',
            [userId, reason]
        );
        res.status(201).json({ message: 'Verification application submitted' });
    } catch (error) {
        console.error("Error submitting verification:", error);
        res.status(500).json({ message: 'Error submitting application' });
    }
});

module.exports = router;
