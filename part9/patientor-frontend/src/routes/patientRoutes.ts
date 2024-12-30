import express from 'express';
import { createEntry } from '../services/patientService';

const router = express.Router();

router.post('/:id/entries', async (req, res) => {
  try {
    const patientId = req.params.id;
    const entry = req.body;

    // Llamar al servicio para agregar la entrada
    const updatedPatient = await createEntry(patientId, entry);
    res.json(updatedPatient);
  } catch (error) {
    res.status(400).send('Error al agregar entrada');
  }
});

export default router;

