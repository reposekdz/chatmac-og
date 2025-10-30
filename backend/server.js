const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const socketManager = require('./services/socketManager');

const postsRouter = require('./api/routes/posts');
const storiesRouter = require('./api/routes/stories');
const reelsRouter = require('./api/routes/reels');
const marketplaceRouter = require('./api/routes/marketplace');
const conversationsRouter = require('./api/routes/conversations');
const notificationsRouter = require('./api/routes/notifications');
const uploadsRouter = require('./api/routes/uploads');
const usersRouter = require('./api/routes/users');
const eventsRouter = require('./api/routes/events');
const bookmarksRouter = require('./api/routes/bookmarks');
const commentsRouter = require('./api/routes/comments');
const reportsRouter = require('./api/routes/reports');
const subscriptionsRouter = require('./api/routes/subscriptions');
const verificationRouter = require('./api/routes/verification');
const challengesRouter = require('./api/routes/challenges');
const achievementsRouter = require('./api/routes/achievements');
const highlightsRouter = require('./api/routes/highlights');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for simplicity
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Make io accessible to our routes
app.set('io', io);

// Initialize Socket.IO manager
socketManager(io);

// API Routes
app.use('/api/posts', postsRouter);
app.use('/api/stories', storiesRouter);
app.use('/api/reels', reelsRouter);
app.use('/api/marketplace', marketplaceRouter);
app.use('/api/conversations', conversationsRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/uploads', uploadsRouter);
app.use('/api/users', usersRouter);
app.use('/api/events', eventsRouter);
app.use('/api/bookmarks', bookmarksRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/subscriptions', subscriptionsRouter);
app.use('/api/verification', verificationRouter);
app.use('/api/challenges', challengesRouter);
app.use('/api/achievements', achievementsRouter);
app.use('/api/highlights', highlightsRouter);


server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
