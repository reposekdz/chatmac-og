const express = require('express');
const router = express.Router();
const db = require('../../db');

// GET /api/posts - Fetches all posts
router.get('/', async (req, res) => {
  const userId = req.query.userId;
  try {
    const query = `
        SELECT 
            p.id, p.content, p.content_type AS contentType, p.media_url AS mediaUrl, p.created_at AS timestamp, 
            p.impact_score AS impactScore, p.likes_count, p.comments_count, p.shares_count,
            u.id as userId, u.username AS name, u.handle, u.avatar_url AS avatar, u.reputation, u.is_community_verified AS isCommunityVerified,
            CASE WHEN l.user_id IS NOT NULL THEN TRUE ELSE FALSE END AS isLiked
        FROM posts p
        JOIN users u ON p.user_id = u.id
        LEFT JOIN likes l ON p.id = l.post_id AND l.user_id = ?
        ORDER BY p.impact_score DESC, p.created_at DESC;
    `;
    const [posts] = await db.query(query, [userId || null]);

    const formattedPosts = posts.map(post => ({
      id: post.id,
      content: post.content,
      contentType: post.contentType,
      mediaUrl: post.mediaUrl,
      timestamp: new Date(post.timestamp).toLocaleString(),
      impactScore: post.impactScore,
      comments: [], // Comments are fetched on demand
      commentsCount: post.comments_count,
      likesCount: post.likes_count,
      sharesCount: post.shares_count,
      isLiked: !!post.isLiked,
      visibility: ['public'], // Mocked
      user: {
        id: post.userId,
        name: post.name,
        handle: post.handle,
        avatar: post.avatar,
        reputation: post.reputation,
        isCommunityVerified: !!post.isCommunityVerified,
      }
    }));

    res.json(formattedPosts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST /api/posts/create - Creates a new post
router.post('/create', async (req, res) => { /* ... content unchanged ... */ });

// POST /api/posts/:id/like - Like or unlike a post
router.post('/:id/like', async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;

    if (!userId) return res.status(400).json({ error: 'User ID is required.' });

    try {
        const [existingLike] = await db.query('SELECT id FROM likes WHERE post_id = ? AND user_id = ?', [postId, userId]);

        if (existingLike.length > 0) {
            // Unlike
            await db.query('DELETE FROM likes WHERE id = ?', [existingLike[0].id]);
            await db.query('UPDATE posts SET impact_score = impact_score - 1 WHERE id = ?', [postId]);
        } else {
            // Like
            await db.query('INSERT INTO likes (post_id, user_id) VALUES (?, ?)', [postId, userId]);
            await db.query('UPDATE posts SET impact_score = impact_score + 1 WHERE id = ?', [postId]);

            // Create a notification
            const [post] = await db.query('SELECT user_id FROM posts WHERE id = ?', [postId]);
            const postAuthorId = post[0].user_id;
            if (postAuthorId !== parseInt(userId, 10)) { // Don't notify for self-likes
                await db.query('INSERT INTO notifications (user_id, actor_id, type, post_id) VALUES (?, ?, ?, ?)', [postAuthorId, userId, 'like', postId]);
            }
        }
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Failed to update like status:", error);
        res.status(500).json({ error: 'Database error' });
    }
});

// GET /api/posts/:id/comments - Get comments for a post
router.get('/:id/comments', async (req, res) => {
    try {
        const query = `
            SELECT c.id, c.content, c.created_at as timestamp,
                   u.id as userId, u.username as name, u.handle, u.avatar_url as avatar
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.post_id = ?
            ORDER BY c.created_at ASC;
        `;
        const [comments] = await db.query(query, [req.params.id]);
        
        const formattedComments = comments.map(c => ({
            id: c.id,
            content: c.content,
            timestamp: new Date(c.timestamp).toLocaleString(),
            user: { id: c.userId, name: c.name, handle: c.handle, avatar: c.avatar }
        }));
        res.json(formattedComments);
    } catch (error) {
        console.error("Failed to fetch comments:", error);
        res.status(500).json({ error: 'Database error' });
    }
});

// POST /api/posts/:id/comments - Add a comment to a post
router.post('/:id/comments', async (req, res) => {
    const postId = req.params.id;
    const { userId, content } = req.body;

    if (!userId || !content) return res.status(400).json({ error: 'User ID and content are required.' });

    try {
        const [result] = await db.query('INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)', [postId, userId, content]);
        await db.query('UPDATE posts SET impact_score = impact_score + 5 WHERE id = ?', [postId]);

        // Create notification
        const [post] = await db.query('SELECT user_id, content FROM posts WHERE id = ?', [postId]);
        const postAuthorId = post[0].user_id;
        const postContentPreview = post[0].content.substring(0, 50);

        if (postAuthorId !== parseInt(userId, 10)) {
            await db.query('INSERT INTO notifications (user_id, actor_id, type, post_id, content_preview) VALUES (?, ?, ?, ?, ?)', [postAuthorId, userId, 'comment', postId, postContentPreview]);
        }

        // Fetch and return the new comment
        const [newComment] = await db.query('SELECT c.id, c.content, c.created_at as timestamp, u.id as userId, u.username as name, u.handle, u.avatar_url as avatar FROM comments c JOIN users u ON c.user_id = u.id WHERE c.id = ?', [result.insertId]);

        res.status(201).json({
            id: newComment[0].id,
            content: newComment[0].content,
            timestamp: new Date(newComment[0].timestamp).toLocaleString(),
            user: { id: newComment[0].userId, name: newComment[0].name, handle: newComment[0].handle, avatar: newComment[0].avatar }
        });
    } catch (error) {
        console.error("Failed to add comment:", error);
        res.status(500).json({ error: 'Database error' });
    }
});

// POST /api/posts/:id/share - Increment share count
router.post('/:id/share', async (req, res) => {
    try {
        await db.query('UPDATE posts SET shares_count = shares_count + 1 WHERE id = ?', [req.params.id]);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Failed to update share count:", error);
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;
