import express from 'express';
import { v4 as uuid } from 'uuid';
import { Entry, HealthCheckEntry, OccupationalHealthCareEntry, HospitalEntry } from '../types';
import { parseDiagnosisCodes } from '../utils/parsers';
import Patient from '../models/patient'; // Asegúrate de importar tu modelo de paciente

const router = express.Router();

// Función para validar los campos obligatorios
const validateEntryFields = (entry: Entry): boolean => {
  switch (entry.type) {
    case 'HealthCheck':
      return (
        typeof entry.date === 'string' &&
        typeof entry.description === 'string' &&
        typeof entry.specialist === 'string' &&
        typeof entry.healthCheckRating === 'number'
      );
    case 'OccupationalHealthcare':
      return (
        typeof entry.date === 'string' &&
        typeof entry.description === 'string' &&
        typeof entry.specialist === 'string' &&
        typeof entry.employerName === 'string'
      );
    case 'Hospital':
      return (
        typeof entry.date === 'string' &&
        typeof entry.description === 'string' &&
        typeof entry.specialist === 'string' &&
        typeof entry.discharge === 'object' &&
        typeof entry.discharge.date === 'string' &&
        typeof entry.discharge.criteria === 'string'
      );
    default:
      return false;
  }
};

// Endpoint para agregar una entrada al paciente
router.post('/:id/entries', async (req, res) => {
  const { id } = req.params;
  const { type, date, description, specialist, diagnosisCodes, ...rest } = req.body;

  // Comprobar si el paciente existe
  const patient = await Patient.findById(id);
  if (!patient) {
    return res.status(404).json({ error: 'Paciente no encontrado' });
  }

  // Validar los campos obligatorios de la entrada
  if (!validateEntryFields(req.body)) {
    return res.status(400).json({ error: 'Campos obligatorios faltantes o incorrectos' });
  }

  const newEntry: Entry = {
    id: uuid(),
    date,
    description,
    specialist,
    diagnoseCodes: parseDiagnosisCodes(req.body),
    type,
    ...rest,
  };

  // Guardar la entrada en el paciente
  patient.entries.push(newEntry);

  try {
    await patient.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar la entrada' });
  }
});

export default router;
