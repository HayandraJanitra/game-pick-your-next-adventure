const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const gamesRoutes = require('./routes/games');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Di production, gantilah dengan URL frontend spesifik (misal: http://localhost:5173)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Base route for sanity check
app.get('/', (req, res) => {
  res.json({ message: 'Selamat datang di Game Pick API Fullstack!' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/games', gamesRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Terjadi kesalahan sistem internal!' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server Express berjalan di port http://localhost:${PORT}`);
});
