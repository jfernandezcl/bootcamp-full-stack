import express, { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
const PORT = 3002;

// Middleware para manejar JSON en solicitudes POST
app.use(express.json());

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

// Endpoint /exercises
app.post('/exercises', (req: Request, res: Response): void => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || target === undefined) {
    res.status(400).json({ error: 'parameters missing' });
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!Array.isArray(daily_exercises) || daily_exercises.some((hour: any) => isNaN(Number(hour))) || isNaN(Number(target))) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const result = calculateExercises(
    daily_exercises.map(Number),
    Number(target)
  );
  res.json(result);
});

app.listen(PORT, (): void => {
  console.log(`Server running on http://localhost:${PORT}`);
});
