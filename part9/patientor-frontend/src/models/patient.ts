import mongoose from 'mongoose';
import { Entry } from '../types';

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ssn: { type: String, required: true },
  occupation: { type: String, required: true },
  gender: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  entries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Entry' }],
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
