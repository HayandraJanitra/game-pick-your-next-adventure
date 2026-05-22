const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'game_pick_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection and auto-create tables if they don't exist
async function initializeDb() {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully to game_pick_db!');
    
    // Create users table if it does not exist (fallback/protection)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create games table if it does not exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS games (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        genre VARCHAR(100),
        platform VARCHAR(255),
        rating DECIMAL(3,2) DEFAULT 0.0,
        release_year INT,
        image_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create favorites table if it does not exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS favorites (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        game_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
      )
    `);

    // Seed admin if not present
    const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', ['admin@gamepick.com']);
    if (rows.length === 0) {
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await connection.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        ['Admin Game Pick', 'admin@gamepick.com', hashedPassword, 'admin']
      );
      console.log('Default admin seeded (admin@gamepick.com / admin123)');
    }

    connection.release();
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
}

initializeDb();

module.exports = pool;
