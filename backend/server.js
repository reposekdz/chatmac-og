const express = require('express');
const cors = require('cors');
const postsRouter = require('./api/routes/posts');
const storiesRouter = require('./api/routes/stories');
const reelsRouter = require('./api/routes/reels');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Allows requests from the frontend
app.use(express.json()); // Parses incoming JSON requests

// API Routes
app.use('/api/posts', postsRouter);
app.use('/api/stories', storiesRouter);
app.use('/api/reels', reelsRouter);


// A simple root route to confirm the server is running
app.get('/', (req, res) => {
  res.send('ChatMac Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});