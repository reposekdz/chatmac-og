const express = require('express');
const router = express.Router();
const db = require('../../db');
const blockchain = require('../../services/blockchain');

// GET /api/marketplace - Get all unsold listings
router.get('/', async (req, res) => {
    try {
        const [listings] = await db.query(`
            SELECT 
                l.*,
                JSON_OBJECT('id', u.id, 'name', u.name, 'handle', u.handle, 'avatar', u.avatar) as seller
            FROM marketplace_listings l
            JOIN users u ON l.seller_id = u.id
            WHERE l.is_sold = FALSE
            ORDER BY l.created_at DESC;
        `);
        res.json(listings);
    } catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).json({ message: "Error fetching listings" });
    }
});

// POST /api/marketplace - Create a new listing
router.post('/', async (req, res) => {
    const { sellerId, name, description, price, imageUrl } = req.body;
    if (!sellerId || !name || !price) {
        return res.status(400).json({ message: "Seller ID, name, and price are required" });
    }
    try {
        const [result] = await db.query(
            'INSERT INTO marketplace_listings (seller_id, name, description, price, image_url) VALUES (?, ?, ?, ?, ?)',
            [sellerId, name, description, price, imageUrl]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        console.error("Error creating listing:", error);
        res.status(500).json({ message: "Error creating listing" });
    }
});

// POST /api/marketplace/:id/buy - Purchase a listing
router.post('/:id/buy', async (req, res) => {
    const listingId = req.params.id;
    const { userId: buyerId, buyerAddress } = req.body;
    
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Get listing details and lock the row for update
        const [listings] = await connection.query('SELECT * FROM marketplace_listings WHERE id = ? AND is_sold = FALSE FOR UPDATE', [listingId]);
        if (listings.length === 0) {
            throw new Error('Listing not found or already sold.');
        }
        const listing = listings[0];
        const { seller_id, price } = listing;

        // 2. Check if buyer is not the seller
        if (buyerId === seller_id) {
            throw new Error('You cannot buy your own item.');
        }

        // 3. Get buyer and seller details
        const [[buyer]] = await connection.query('SELECT * FROM users WHERE id = ?', [buyerId]);
        const [[seller]] = await connection.query('SELECT * FROM users WHERE id = ?', [seller_id]);
        
        if (buyer.coins < price) {
            throw new Error('Insufficient coins.');
        }
        
        // 4. Perform transactions
        await connection.query('UPDATE users SET coins = coins - ? WHERE id = ?', [price, buyerId]);
        await connection.query('UPDATE users SET coins = coins + ? WHERE id = ?', [price, seller_id]);
        await connection.query('UPDATE marketplace_listings SET is_sold = TRUE WHERE id = ?', [listingId]);

        // 5. Log to blockchain service
        blockchain.logTransaction(buyerAddress, `wallet_of_${seller.handle}`, listingId, price);
        
        // 6. Create notification for seller
        await connection.query(
            `INSERT INTO notifications (user_id, actor_id, type, entity_id) VALUES (?, ?, 'marketplace_purchase', ?)`,
            [seller_id, buyerId, listingId]
        );

        await connection.commit();
        res.json({ message: 'Purchase successful!' });
    } catch (error) {
        await connection.rollback();
        console.error("Purchase failed:", error);
        res.status(500).json({ message: error.message || "Purchase failed due to a server error." });
    } finally {
        connection.release();
    }
});

module.exports = router;