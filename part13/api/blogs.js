import pool from '../db/index.js';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      // Recuperar todos los blogs
      const result = await pool.query('SELECT * FROM blogs');
      res.status(200).json(result.rows);
    } else if (req.method === 'POST') {
      // Agregar un nuevo blog
      const { author, url, title, likes } = req.body;

      if (!url || !title) {
        return res.status(400).json({ error: 'URL and Title are required' });
      }

      const result = await pool.query(
        'INSERT INTO blogs (author, url, title, likes) VALUES ($1, $2, $3, $4) RETURNING *',
        [author || null, url, title, likes || 0]
      );

      res.status(201).json(result.rows[0]);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    console.error('Error handling request:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}
