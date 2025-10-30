const express = require('express');
const router = express.Router();
const db = require('../../db');
const socketManager = require('../../services/socketManager');

// GET /api/conversations?userId=... - Get all conversations for a user
router.get('/', async (req, res) => {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: 'User ID is required' });

    try {
        const query = `
            SELECT 
                c.id,
                p.user_id as participant_id,
                u.name as participant_name,
                u.handle as participant_handle,
                u.avatar as participant_avatar,
                (SELECT content FROM messages WHERE conversation_id = c.id ORDER BY created_at DESC LIMIT 1) as last_message,
                (SELECT created_at FROM messages WHERE conversation_id = c.id ORDER BY created_at DESC LIMIT 1) as last_message_at
            FROM conversations c
            JOIN conversation_participants p ON c.id = p.conversation_id
            JOIN users u ON p.user_id = u.id
            WHERE c.id IN (SELECT conversation_id FROM conversation_participants WHERE user_id = ?)
            AND p.user_id != ?;
        `;
        const [conversations] = await db.query(query, [userId, userId]);
        
        const formatted = conversations.map(c => ({
            id: c.id,
            participant: {
                id: c.participant_id,
                name: c.participant_name,
                handle: c.participant_handle,
                avatar: c.participant_avatar,
            },
            last_message: c.last_message,
            last_message_at: c.last_message_at,
            unread_count: 0, // Placeholder
        }));

        res.json(formatted);
    } catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({ message: 'Error fetching conversations' });
    }
});

// GET /api/conversations/:id/messages - Get messages for a conversation
router.get('/:id/messages', async (req, res) => {
    const { id } = req.params;
    try {
        const [messages] = await db.query(
            'SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at DESC',
            [id]
        );
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Error fetching messages' });
    }
});

// POST /api/conversations/:id/messages - Send a message
router.post('/:id/messages', async (req, res) => {
    const { id: conversationId } = req.params;
    const { senderId, content } = req.body;
    if (!senderId || !content) {
        return res.status(400).json({ message: 'Sender ID and content are required' });
    }
    try {
        const [result] = await db.query(
            'INSERT INTO messages (conversation_id, sender_id, content) VALUES (?, ?, ?)',
            [conversationId, senderId, content]
        );
        const [[newMessage]] = await db.query('SELECT * FROM messages WHERE id = ?', [result.insertId]);

        // Emit message via socket
        const io = req.app.get('io');
        const [[recipient]] = await db.query('SELECT user_id FROM conversation_participants WHERE conversation_id = ? AND user_id != ?', [conversationId, senderId]);
        if (recipient) {
            io.to(`conversation:${conversationId}`).emit('newMessage', newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Error sending message' });
    }
});

module.exports = router;
