const express = require('express');
const router = express.Router();
const db = require('../../db');

// GET /api/conversations - List conversations for a user
router.get('/', async (req, res) => {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ error: 'User ID is required.' });

    try {
        const query = `
            SELECT 
                u.id, u.username, u.handle, u.avatar_url,
                (SELECT content FROM messages WHERE (sender_id = u.id AND receiver_id = ?) OR (sender_id = ? AND receiver_id = u.id) ORDER BY created_at DESC LIMIT 1) as lastMessage,
                (SELECT created_at FROM messages WHERE (sender_id = u.id AND receiver_id = ?) OR (sender_id = ? AND receiver_id = u.id) ORDER BY created_at DESC LIMIT 1) as time
            FROM users u
            WHERE u.id != ? AND EXISTS (
                SELECT 1 FROM messages WHERE (sender_id = u.id AND receiver_id = ?) OR (sender_id = ? AND receiver_id = u.id)
            )
        `;
        const [users] = await db.query(query, [userId, userId, userId, userId, userId, userId, userId]);
        
        const conversations = users.map(u => ({
            user: {
                id: u.id,
                name: u.username,
                handle: u.handle,
                avatar: u.avatar_url,
            },
            lastMessage: u.lastMessage || 'No messages yet.',
            time: u.time ? new Date(u.time).toLocaleTimeString() : '',
            unread: 0 // Mocked for now
        }));
        
        res.json(conversations);
    } catch (error) {
        console.error("Failed to list conversations:", error);
        res.status(500).json({ error: 'Database error' });
    }
});

// GET /api/conversations/:otherUserId - Get message history with a specific user
router.get('/:otherUserId', async (req, res) => {
    const loggedInUserId = req.query.userId;
    const otherUserId = req.params.otherUserId;

    if (!loggedInUserId) return res.status(400).json({ error: 'Logged in User ID is required.' });

    try {
        const query = `
            SELECT id, sender_id, content, created_at
            FROM messages
            WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)
            ORDER BY created_at ASC;
        `;
        const [messages] = await db.query(query, [loggedInUserId, otherUserId, otherUserId, loggedInUserId]);
        res.json(messages);
    } catch (error) {
        console.error("Failed to get messages:", error);
        res.status(500).json({ error: 'Database error' });
    }
});

// POST /api/conversations/:receiverId - Send a message
router.post('/:receiverId', async (req, res) => {
    const { senderId, content } = req.body;
    const receiverId = req.params.receiverId;

    if (!senderId || !content) return res.status(400).json({ error: 'Sender ID and content are required.' });
    
    try {
        const [result] = await db.query(
            'INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)',
            [senderId, receiverId, content]
        );
        
        const [newMessage] = await db.query('SELECT * FROM messages WHERE id = ?', [result.insertId]);
        res.status(201).json(newMessage[0]);
    } catch (error) {
        console.error("Failed to send message:", error);
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;
