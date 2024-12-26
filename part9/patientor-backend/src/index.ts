import express from 'express';
import cors from 'cors';

import diagnoseRouter from './routes/diagnose';
import patientRouter from './routes/patients';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
