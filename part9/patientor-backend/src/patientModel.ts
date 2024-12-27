import { Patient, NonSensitivePatient } from '../types';

export const getPatientById = async (id: string): Promise<Patient | null> => {
  
  const patient: Patient = {
    id: id,
    name: "John Doe",
    ssn: "123-45-6789",
    occupation: "Engineer",
    gender: "male", // ejemplo de valor para gender
    dateOfBirth: "1990-01-01",
    entries: []  // Aquí inicializamos el array de entradas vacío.
  };

  // Retornar el paciente
  return patient;
};
