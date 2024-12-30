import { Entry } from '../types/entry';

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: string;
  dateOfBirth: string;
  entries: Entry[]; // Añadido el tipo de entrada
}
