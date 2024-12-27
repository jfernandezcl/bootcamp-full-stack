import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);

  if (!patient) {
    return res.status(404).send({ error: 'Patient not found' });
  }

  res.json(patient);
});

export default router;
