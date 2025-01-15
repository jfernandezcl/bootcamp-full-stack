import pool from './db/index.js';

(async () => {
  try {
    console.log("Executing (default): SELECT * FROM blogs");

    // Realiza la consulta para obtener todos los blogs
    const result = await pool.query('SELECT * FROM blogs');

    // Itera sobre los resultados y muestra cada blog
    result.rows.forEach(blog => {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
    });

    // Cierra la conexión con la base de datos
    await pool.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
