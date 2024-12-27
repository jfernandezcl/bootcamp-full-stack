import express from 'express';
import { getPatient } from '../controllers/patientController';

const router = express.Router();

router.get('/patients/:id', getPatient);

export default router;
