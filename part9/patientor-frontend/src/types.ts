export interface OccupationalHealthCareEntry {
  type: "OccupationalHealthCare";
  description: string;
  date: string;
  specialist: string;
  employerName: string;
  diagnoseCodes?: string[];
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
  diagnoseCodes?: string[];
}

export type Entry = OccupationalHealthCareEntry | HospitalEntry;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: string;
  dateOfBirth: string;
  entries: Entry[];
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}
