
const express = require('express');
const router = express.Router();
const db = require('../../db');

// POST /api/subscriptions - Subscribe to a creator
router.post('/', async (req, res) => {
    const { subscriberId, creatorId } = req.body;

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [[creator]] = await connection.query('SELECT subscription_price FROM users WHERE id = ?', [creatorId]);
        if (!creator) throw new Error('Creator not found');
        
        const price = creator.subscription_price;

        const [[subscriber]] = await connection.query('SELECT coins FROM users WHERE id = ?', [subscriberId]);
        if (subscriber.coins < price) throw new Error('Insufficient coins');

        await connection.query('UPDATE users SET coins = coins - ? WHERE id = ?', [price, subscriberId]);
        await connection.query('UPDATE users SET coins = coins + ? WHERE id = ?', [price, creatorId]);

        await connection.query(
            'INSERT INTO subscriptions (subscriber_id, creator_id) VALUES (?, ?)',
            [subscriberId, creatorId]
        );
        
        await connection.commit();
        res.status(201).json({ message: 'Subscription successful' });
    } catch (error) {
        await connection.rollback();
        console.error("Subscription error:", error);
        res.status(500).json({ message: error.message || 'Subscription failed' });
    } finally {
        connection.release();
    }
});

module.exports = router;
