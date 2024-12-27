/* eslint-disable @typescript-eslint/no-empty-object-type */
 
export interface Entry {
  // Aquí podrías definir los campos relacionados con las entradas si fueran necesarios en el futuro
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
