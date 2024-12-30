import { Patient } from '../models/patient';
import { Entry } from '../types/entry';

let patients: Patient[] = []; // Este sería el arreglo de pacientes

export const createEntry = (patientId: string, entry: Entry): Patient => {
  const patient = patients.find(p => p.id === patientId);
  if (!patient) {
    throw new Error('Paciente no encontrado');
  }

  patient.entries.push(entry);
  return patient;
};
