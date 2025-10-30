const express = require('express');
const router = express.Router();
const db = require('../../db');
const blockchain = require('../../services/blockchain');

// GET /api/nfts - Get all NFTs for the marketplace
router.get('/', async (req, res) => {
    try {
        const [nfts] = await db.query(`
            SELECT 
                n.id, n.price,
                JSON_OBJECT('id', p.id, 'content', p.content, 'image_url', p.image_url) as post,
                JSON_OBJECT('id', c.id, 'name', c.name, 'handle', c.handle, 'avatar', c.avatar) as creator,
                JSON_OBJECT('id', o.id, 'name', o.name, 'handle', o.handle, 'avatar', o.avatar) as owner
            FROM nfts n
            JOIN posts p ON n.post_id = p.id
            JOIN users c ON n.creator_id = c.id
            JOIN users o ON n.owner_id = o.id
            ORDER BY n.created_at DESC;
        `);
        res.json(nfts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching NFTs' });
    }
});

// GET /api/nfts/user/:userId - Get NFTs for a specific user
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
         const [nfts] = await db.query(`
            SELECT 
                n.id, n.price,
                JSON_OBJECT('id', p.id, 'content', p.content, 'image_url', p.image_url) as post,
                JSON_OBJECT('id', c.id, 'name', c.name, 'handle', c.handle, 'avatar', c.avatar) as creator,
                JSON_OBJECT('id', o.id, 'name', o.name, 'handle', o.handle, 'avatar', o.avatar) as owner
            FROM nfts n
            JOIN posts p ON n.post_id = p.id
            JOIN users c ON n.creator_id = c.id
            JOIN users o ON n.owner_id = o.id
            WHERE n.owner_id = ?
            ORDER BY n.created_at DESC;
        `, [userId]);
        res.json(nfts);
    } catch (error) {
         res.status(500).json({ message: 'Error fetching user NFTs' });
    }
});

// POST /api/nfts/mint - Mint a post as an NFT
router.post('/mint', async (req, res) => {
    const { postId, userId, price } = req.body;
    try {
        const [[post]] = await db.query('SELECT user_id FROM posts WHERE id = ?', [postId]);
        if (!post || post.user_id !== userId) {
            return res.status(403).json({ message: 'You can only mint your own posts.' });
        }
        
        const [[existingNft]] = await db.query('SELECT id FROM nfts WHERE post_id = ?', [postId]);
        if (existingNft) {
             return res.status(400).json({ message: 'This post has already been minted as an NFT.' });
        }

        const mintTx = blockchain.mintNFT(userId, postId);

        const [result] = await db.query(
            'INSERT INTO nfts (post_id, creator_id, owner_id, price, mint_transaction_hash) VALUES (?, ?, ?, ?, ?)',
            [postId, userId, userId, price, mintTx.hash]
        );

        res.status(201).json({ nftId: result.insertId, transaction: mintTx });
    } catch (error) {
        res.status(500).json({ message: 'Error minting NFT' });
    }
});

module.exports = router;