const express = require('express');
const router = express.Router();
const db = require('../../db');

// GET /api/notifications?userId=... - Get notifications for a user
router.get('/', async (req, res) => {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: 'User ID is required' });

    try {
        const query = `
            SELECT 
                n.*,
                JSON_OBJECT('id', u.id, 'name', u.name, 'handle', u.handle, 'avatar', u.avatar) as actor,
                p.id as post_id,
                p.content as post_content
            FROM notifications n
            JOIN users u ON n.actor_id = u.id
            LEFT JOIN posts p ON n.entity_id = p.id AND n.type IN ('like', 'comment', 'mention')
            WHERE n.user_id = ?
            ORDER BY n.created_at DESC;
        `;
        const [notifications] = await db.query(query, [userId]);

        const formatted = notifications.map(n => ({
            id: n.id,
            type: n.type,
            actor: n.actor,
            post: n.post_id ? { id: n.post_id, content: n.post_content.substring(0, 50) + '...' } : null,
            content: n.type === 'system' ? 'A new system update is available.' : null, // dummy content
            created_at: n.created_at,
            is_read: !!n.is_read,
        }));
        
        res.json(formatted);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Error fetching notifications' });
    }
});

module.exports = router;