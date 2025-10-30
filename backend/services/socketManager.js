const userSockets = new Map();

function socketManager(io) {
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('register', (userId) => {
            console.log(`User ${userId} registered with socket ${socket.id}`);
            userSockets.set(userId, socket.id);
            // Let others know this user is online
            socket.broadcast.emit('userOnline', userId);
        });
        
        socket.on('getOnlineUsers', (callback) => {
            const onlineUserIds = Array.from(userSockets.keys());
            callback(onlineUserIds);
        });

        socket.on('joinRoom', (roomName) => {
            socket.join(roomName);
            console.log(`Socket ${socket.id} joined room ${roomName}`);
        });
        
        // WebRTC Signaling
        socket.on('video-offer', (data) => {
            const recipientSocketId = userSockets.get(data.recipientId);
            if (recipientSocketId) {
                io.to(recipientSocketId).emit('video-offer', { offer: data.offer, senderId: data.senderId });
            }
        });

        socket.on('video-answer', (data) => {
            const recipientSocketId = userSockets.get(data.recipientId);
            if (recipientSocketId) {
                io.to(recipientSocketId).emit('video-answer', { answer: data.answer });
            }
        });

        socket.on('ice-candidate', (data) => {
            const recipientSocketId = userSockets.get(data.recipientId);
             if (recipientSocketId) {
                io.to(recipientSocketId).emit('ice-candidate', { candidate: data.candidate });
            }
        });
        
        socket.on('end-call', (data) => {
            const recipientSocketId = userSockets.get(data.recipientId);
            if (recipientSocketId) {
                io.to(recipientSocketId).emit('call-ended');
            }
        });


        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
            for (let [userId, socketId] of userSockets.entries()) {
                if (socketId === socket.id) {
                    userSockets.delete(userId);
                    // Let others know this user is offline
                    socket.broadcast.emit('userOffline', userId);
                    break;
                }
            }
        });
    });
}

module.exports = socketManager;
