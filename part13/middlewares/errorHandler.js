const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.code === '23502') {
    return res.status(400).json({ error: 'Datos inválidos o incompletos' });
  }

  res.status(500).json({ error: 'Error interno del servidor' });
};

export default errorHandler;
