const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak, token tidak ditemukan' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'supersecretgamepickkey123!');
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token tidak valid atau kadaluwarsa' });
  }
}

function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Akses ditolak, Anda bukan admin' });
  }
  next();
}

module.exports = {
  authenticateToken,
  isAdmin
};
