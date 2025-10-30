
const express = require('express');
const router = express.Router();
const db = require('../../db');

// POST /api/reports - Create a new report
router.post('/', async (req, res) => {
    const { reporterId, entityType, entityId, reason } = req.body;
    if (!reporterId || !entityType || !entityId) {
        return res.status(400).json({ message: 'Reporter ID, entity type, and entity ID are required' });
    }
    try {
        await db.query(
            'INSERT INTO reports (reporter_id, entity_type, entity_id, reason) VALUES (?, ?, ?, ?)',
            [reporterId, entityType, entityId, reason]
        );
        res.status(201).json({ message: 'Report submitted successfully' });
    } catch (error) {
        console.error("Error submitting report:", error);
        res.status(500).json({ message: "Error submitting report" });
    }
});

module.exports = router;
