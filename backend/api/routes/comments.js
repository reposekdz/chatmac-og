
const express = require('express');
const router = express.Router();
const db = require('../../db');

// Note: Most comment logic is in /api/posts/:id/comments for context.
// This file can be used for comment-specific actions like liking.

// POST /api/comments/:id/like - Like or unlike a comment
router.post('/:id/like', async (req, res) => {
    const commentId = req.params.id;
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    try {
        // This requires a comment_likes table in your schema.
        // Assuming: CREATE TABLE comment_likes (id INT AUTO_INCREMENT PRIMARY KEY, comment_id INT, user_id INT, FOREIGN KEY (comment_id) REFERENCES comments(id), FOREIGN KEY (user_id) REFERENCES users(id), UNIQUE(comment_id, user_id));
        const [[existing]] = await db.query('SELECT id FROM comment_likes WHERE comment_id = ? AND user_id = ?', [commentId, userId]);
        if (existing) {
            await db.query('DELETE FROM comment_likes WHERE id = ?', [existing.id]);
            res.json({ liked: false });
        } else {
            await db.query('INSERT INTO comment_likes (comment_id, user_id) VALUES (?, ?)', [commentId, userId]);
            res.json({ liked: true });
        }
    } catch (error) {
        console.error("Error liking comment:", error);
        res.status(500).json({ message: 'Error liking comment' });
    }
});


module.exports = router;
