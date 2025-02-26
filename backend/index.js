import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoute.js';
import messageRoutes from './routes/messageRoute.js';
import  port  from './config/config.js';

const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/message', messageRoutes);

// Database Connection
connectDB();

// Socket.io Logic
io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('online', (email) => {
    socket.join(email);
    io.emit('user-status', { email, online: true });
  });

  socket.on('send-message', async (data) => {
    const { sender, recipient, message } = data;
    io.to(recipient).emit('receive-message', { sender, message });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

// Start Server
server.listen(port, () => {
  console.log("port",port)
  console.log(`Server running on port ${port}`);
});