const errorHandler = (error, req, res, next) => {
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: error.errors.map(err => err.message),
    });
  }
  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: ['El correo electrónico ya está en uso'] });
  }

  res.status(500).json({ error: 'Error interno del servidor' });
};

export default errorHandler;
