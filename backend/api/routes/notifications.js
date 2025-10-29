const express = require('express');
const router = express.Router();
const db = require('../../db');

// GET /api/notifications - Fetches notifications for a user
router.get('/', async (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required.' });
    }

    try {
        const query = `
            SELECT 
                n.id, n.type, n.post_id, n.content_preview, n.read_status, n.created_at,
                u.id as actorId, u.username as actorName, u.handle as actorHandle, u.avatar_url as actorAvatar
            FROM notifications n
            JOIN users u ON n.actor_id = u.id
            WHERE n.user_id = ?
            ORDER BY n.created_at DESC;
        `;
        const [notifications] = await db.query(query, [userId]);

        const formattedNotifications = notifications.map(n => ({
            id: n.id,
            type: n.type,
            post_id: n.post_id,
            content_preview: n.content_preview,
            read_status: !!n.read_status,
            created_at: n.created_at,
            actor: {
                id: n.actorId,
                name: n.actorName,
                handle: n.actorHandle,
                avatar: n.actorAvatar
            }
        }));

        res.json(formattedNotifications);
    } catch (error) {
        console.error("Failed to fetch notifications:", error);
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;
