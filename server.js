const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  const io = new Server(httpServer, {
    cors: {
      origin: process.env.NODE_ENV === 'production' 
        ? 'https://b-rent-production.up.railway.app' 
        : 'http://localhost:3000',
      methods: ["GET", "POST"],
      credentials: true
    },
    transports: ['websocket', 'polling']
  });

  // Socket.io connection handling
  io.on('connection', (socket) => {
    console.log('✅ User connected:', socket.id);

    // Join a room for specific ad conversation
    socket.on('join-room', (adId) => {
      const roomId = `ad-${adId}`;
      socket.join(roomId);
      console.log(`✅ User ${socket.id} joined room ${roomId}`);
    });

    // Handle sending messages
    socket.on('send-message', (messageData) => {
      console.log('📨 Broadcasting message:', messageData);
      
      const roomId = `ad-${messageData.adId}`;
      
      // Broadcast to ALL users in the room (including sender)
      io.to(roomId).emit('receive-message', messageData);
    });

    // Handle typing indicator (optional)
    socket.on('typing', (data) => {
      const roomId = `ad-${data.adId}`;
      socket.to(roomId).emit('user-typing', {
        userId: data.userId,
        userName: data.userName
      });
    });

    socket.on('stop-typing', (data) => {
      const roomId = `ad-${data.adId}`;
      socket.to(roomId).emit('user-stop-typing', {
        userId: data.userId
      });
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
      console.log('❌ User disconnected:', socket.id);
    });
  });

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
      console.log(`> Socket.io server running`);
    });
});