export interface HealthCheckEntry {
  type: "HealthCheck";
  description: string;
  date: string;
  specialist: string;
  healthCheckRating: number; // Un número entre 0 y 3
}

export interface HospitalEntry {
  type: "Hospital";
  description: string;
  date: string;
  specialist: string;
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry {
  type: "OccupationalHealthcare";
  description: string;
  date: string;
  specialist: string;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;
