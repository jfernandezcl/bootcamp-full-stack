import express from 'express';
import { v1 as uuid } from 'uuid';
import patients from '../data/patients';
import { NonSensitivePatient, Patient } from '../types/types';
import { toNewPatient } from '../utils/patientParser';

const router = express.Router();

router.get('/', (_req, res) => {
  const nonSensitivePatients: NonSensitivePatient[] = patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

  res.json(nonSensitivePatients);
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const patient: Patient = {
      id: uuid(),
      ...newPatient,
    };

    patients.push(patient);
    res.json(patient);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;
