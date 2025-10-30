const express = require('express');
const router = express.Router();
const db = require('../../db');

// GET /api/events - Get all events
router.get('/', async (req, res) => {
    try {
        const [events] = await db.query('SELECT * FROM events ORDER BY date ASC');
        res.json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: "Error fetching events" });
    }
});

module.exports = router;