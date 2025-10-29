const express = require('express');
const router = express.Router();
const db = require('../../db');

// GET /api/posts - Fetches all posts from the database
router.get('/', async (req, res) => {
  try {
    const query = `
        SELECT 
            p.id, p.content, p.content_type AS contentType, p.media_url AS mediaUrl, p.created_at AS timestamp, p.impact_score AS impactScore,
            u.username AS name, u.handle, u.avatar_url AS avatar, u.reputation, u.is_community_verified AS isCommunityVerified
        FROM posts p
        JOIN users u ON p.user_id = u.id
        ORDER BY p.created_at DESC;
    `;
    const [posts] = await db.query(query);

    // Reformat data to match frontend structure
    const formattedPosts = posts.map(post => ({
      id: post.id,
      content: post.content,
      contentType: post.contentType,
      mediaUrl: post.mediaUrl,
      timestamp: new Date(post.timestamp).toLocaleTimeString(), // Simple time formatting
      impactScore: post.impactScore,
      comments: 0, // Mocked for now
      shares: 0,   // Mocked for now
      visibility: ['public'], // Mocked for now
      user: {
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
router.post('/create', async (req, res) => {
    const { content, user_id, contentType, mediaUrl } = req.body;

    if (!content || !user_id) {
        return res.status(400).json({ error: 'Content and user_id are required.' });
    }

    try {
        const insertQuery = `
            INSERT INTO posts (user_id, content, content_type, media_url)
            VALUES (?, ?, ?, ?);
        `;
        const [result] = await db.query(insertQuery, [user_id, content, contentType || 'TEXT', mediaUrl || null]);
        
        const postId = result.insertId;

        // Fetch the newly created post with user info to send back to the client
        const selectQuery = `
            SELECT 
                p.id, p.content, p.content_type AS contentType, p.media_url AS mediaUrl, p.created_at AS timestamp, p.impact_score AS impactScore,
                u.username AS name, u.handle, u.avatar_url AS avatar, u.reputation, u.is_community_verified AS isCommunityVerified
            FROM posts p
            JOIN users u ON p.user_id = u.id
            WHERE p.id = ?;
        `;
        const [newPostRows] = await db.query(selectQuery, [postId]);
        const newPost = newPostRows[0];
        
        // Format to match frontend structure
         const formattedPost = {
            id: newPost.id,
            content: newPost.content,
            contentType: newPost.contentType,
            mediaUrl: newPost.mediaUrl,
            timestamp: new Date(newPost.timestamp).toLocaleTimeString(),
            impactScore: newPost.impactScore,
            comments: 0,
            shares: 0,
            visibility: ['public'],
            user: {
                name: newPost.name,
                handle: newPost.handle,
                avatar: newPost.avatar,
                reputation: newPost.reputation,
                isCommunityVerified: !!newPost.isCommunityVerified,
            }
        };

        res.status(201).json(formattedPost);

    } catch (error) {
        console.error("Failed to create post:", error);
        res.status(500).json({ error: 'Database error while creating post.' });
    }
});


module.exports = router;