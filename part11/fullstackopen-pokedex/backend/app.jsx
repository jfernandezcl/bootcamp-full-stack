app.get('/health', (req, res) => {
  // Simula un error
  if (true) throw ('error...');
  res.send('ok');
});
