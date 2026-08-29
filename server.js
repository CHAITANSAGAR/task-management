require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
const server = http.createServer(app);

const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';

app.use(cors({
  origin: clientUrl,
  credentials: true
}));
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: clientUrl,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});

app.set('io', io);

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Task Manager API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
  socket.on('disconnect', () => console.log('Socket disconnected:', socket.id));
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is missing in backend/.env');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    server.listen(PORT, () => {
      console.log(`Backend running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
