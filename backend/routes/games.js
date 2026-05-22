const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// GET /api/games/stats - Mendapatkan statistik game untuk Dashboard (Letakkan sebelum GET /:id agar tidak tertabrak)
router.get('/stats', async (req, res) => {
  try {
    const [totalRows] = await pool.query('SELECT COUNT(*) AS totalGames FROM games');
    const [avgRatingRows] = await pool.query('SELECT AVG(rating) AS avgRating FROM games');
    const [platformsCountRows] = await pool.query('SELECT COUNT(DISTINCT genre) AS totalGenres FROM games');
    
    // Default statistics if database is empty
    const stats = {
      totalGames: totalRows[0]?.totalGames || 0,
      avgRating: parseFloat(avgRatingRows[0]?.avgRating || 0).toFixed(1),
      totalGenres: platformsCountRows[0]?.totalGenres || 0,
      activeUsers: 1 // Placeholder/Mokeup
    };

    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

// GET /api/games - Mendapatkan semua daftar game
router.get('/', async (req, res) => {
  try {
    const [games] = await pool.query('SELECT * FROM games ORDER BY id DESC');
    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

// GET /api/games/:id - Mendapatkan detail satu game
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [games] = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
    if (games.length === 0) {
      return res.status(404).json({ message: 'Game tidak ditemukan' });
    }
    res.json(games[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

// POST /api/games - Menambahkan game baru (Admin Only)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
  const { title, description, genre, platform, rating, release_year, image_url } = req.body;

  if (!title || !genre || !platform) {
    return res.status(400).json({ message: 'Title, genre, dan platform wajib diisi' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO games (title, description, genre, platform, rating, release_year, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        title,
        description || '',
        genre,
        Array.isArray(platform) ? platform.join(', ') : platform,
        rating || 0.0,
        release_year || new Date().getFullYear(),
        image_url || ''
      ]
    );

    res.status(201).json({
      message: 'Game berhasil ditambahkan!',
      game: {
        id: result.insertId,
        title,
        description,
        genre,
        platform,
        rating,
        release_year,
        image_url
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

// PUT /api/games/:id - Mengupdate data game (Admin Only)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, description, genre, platform, rating, release_year, image_url } = req.body;

  if (!title || !genre || !platform) {
    return res.status(400).json({ message: 'Title, genre, dan platform wajib diisi' });
  }

  try {
    const [existing] = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Game tidak ditemukan' });
    }

    await pool.query(
      'UPDATE games SET title = ?, description = ?, genre = ?, platform = ?, rating = ?, release_year = ?, image_url = ? WHERE id = ?',
      [
        title,
        description || '',
        genre,
        Array.isArray(platform) ? platform.join(', ') : platform,
        rating || 0.0,
        release_year || new Date().getFullYear(),
        image_url || '',
        id
      ]
    );

    res.json({
      message: 'Game berhasil diperbarui!',
      game: {
        id,
        title,
        description,
        genre,
        platform,
        rating,
        release_year,
        image_url
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

// DELETE /api/games/:id - Menghapus game (Admin Only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const [existing] = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Game tidak ditemukan' });
    }

    await pool.query('DELETE FROM games WHERE id = ?', [id]);
    res.json({ message: 'Game berhasil dihapus!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

module.exports = router;
