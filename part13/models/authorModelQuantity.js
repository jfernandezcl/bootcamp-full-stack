import pool from '../db/index.js';

export const getAuthorsStats = async () => {
  const result = await pool.query(`
    SELECT 
      author, 
      COUNT(*) AS articles, 
      SUM(likes) AS likes 
    FROM blogs 
    GROUP BY author 
    ORDER BY likes DESC
  `);

  return result.rows;
};
