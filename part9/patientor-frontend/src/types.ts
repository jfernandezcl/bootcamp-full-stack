
export interface OccupationalHealthCareEntry {
  type: "OccupationalHealthCare";
  description: string;
  date: string;
  specialist: string;
  employerName: string;
}

export interface HospitalEntry {
  type: "Hospital";
  description: string;
  date: string;
  discharge: {
    date: string;
    criteria: string;
  };
  specialist: string;
}

export type Entry = OccupationalHealthCareEntry | HospitalEntry;

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
