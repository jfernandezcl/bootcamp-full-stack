import express, { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();
const PORT = 3002;

app.get('/hello', (_req: Request, res: Response): void => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response): void => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const bmi = calculateBmi(height, weight);
  res.json({ weight, height, bmi });
});

app.listen(PORT, (): void => {
  console.log(`Server running on http://localhost:${PORT}`);
});
