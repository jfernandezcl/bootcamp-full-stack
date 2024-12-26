import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnose';

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
