import pool from '../db/index.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const result = await pool.query('SELECT NOW()');
    res.status(200).json({ message: 'API is working!', time: result.rows[0].now });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
