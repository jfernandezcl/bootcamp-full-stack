import express, { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();
const PORT = 3002;

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: 'malformatted parameters' });
    return; // Para garantizar que no haya rutas sin valor de retorno.
  }

  const bmi = calculateBmi(height, weight);
  res.json({ weight, height, bmi });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
