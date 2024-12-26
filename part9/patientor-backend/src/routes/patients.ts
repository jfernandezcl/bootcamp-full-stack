import express from 'express';
import { v1 as uuid } from 'uuid';
import patients from '../data/patients';
import { NewPatient, Patient, NonSensitivePatient } from '../types/types';

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
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  if (!name || !dateOfBirth || !ssn || !gender || !occupation) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const newPatient: NewPatient = {
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  };

  const patient: Patient = {
    id: uuid(),
    ...newPatient,
  };

  patients.push(patient);
  res.json(patient);
});

export default router;
