

const express = require('express');
const router = express.Router();
const db = require('../../db');

// GET /api/users/nearby - Find users by geolocation
router.get('/nearby', async (req, res) => {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
        return res.status(400).json({ message: "Latitude and longitude are required" });
    }
    // FIX: Using a more correct, albeit simple, distance calculation (Euclidean distance squared).
    // Assumes `latitude` and `longitude` columns exist on the `users` table.
    const query = `
        SELECT id, name, handle, avatar, isCommunityVerified
        FROM users 
        WHERE latitude IS NOT NULL AND longitude IS NOT NULL
        ORDER BY (POW(latitude - ?, 2) + POW(longitude - ?, 2)) ASC
        LIMIT 5;
    `;
    try {
        const [users] = await db.query(query, [parseFloat(lat), parseFloat(lon)]);
        res.json(users);
    } catch (error) {
        console.error("Error fetching nearby users:", error);
        res.status(500).json({ message: 'Error fetching nearby users' });
    }
});

// GET /api/users/suggestions - Get users to follow
router.get('/suggestions', async (req, res) => {
    const userId = req.query.userId || 0;
    try {
        const [users] = await db.query(`
            SELECT id, name, handle, avatar
            FROM users
            WHERE id != ? AND id NOT IN (SELECT following_id FROM followers WHERE follower_id = ?)
            ORDER BY RAND()
            LIMIT 3
        `, [userId, userId]);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching suggestions' });
    }
});

// GET /api/users/:handle - Get a user's profile
router.get('/:handle', async (req, res) => {
    const { handle } = req.params;
    const viewerId = req.query.viewerId || 0;

    try {
        const [[user]] = await db.query('SELECT id, name, handle, avatar, bio, created_at, is_verified, status_emoji FROM users WHERE handle = ?', [handle.startsWith('@') ? handle.substring(1) : handle]);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const [[counts]] = await db.query(`
            SELECT 
                (SELECT COUNT(*) FROM followers WHERE following_id = ?) as followers_count,
                (SELECT COUNT(*) FROM followers WHERE follower_id = ?) as following_count,
                (SELECT COUNT(*) > 0 FROM followers WHERE follower_id = ? AND following_id = ?) as is_followed_by_viewer
        `, [user.id, user.id, viewerId, user.id]);

        res.json({ ...user, ...counts });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile' });
    }
});

// POST /api/users/follow - Follow or unfollow a user
router.post('/follow', async (req, res) => {
    const { userId, targetId } = req.body;
    try {
        const [[existing]] = await db.query('SELECT * FROM followers WHERE follower_id = ? AND following_id = ?', [userId, targetId]);
        if (existing) {
            await db.query('DELETE FROM followers WHERE id = ?', [existing.id]);
            res.json({ followed: false });
        } else {
            await db.query('INSERT INTO followers (follower_id, following_id) VALUES (?, ?)', [userId, targetId]);
            res.json({ followed: true });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error following user' });
    }
});

// POST /api/users/status - Update user status
router.post('/status', async (req, res) => {
    const { userId, emoji } = req.body;
    if (!userId || emoji === undefined) {
        return res.status(400).json({ message: 'User ID and emoji are required.' });
    }
    try {
        await db.query('UPDATE users SET status_emoji = ? WHERE id = ?', [emoji, userId]);
        res.json({ success: true, emoji });
    } catch (error) {
        res.status(500).json({ message: 'Error updating status' });
    }
});


module.exports = router;
