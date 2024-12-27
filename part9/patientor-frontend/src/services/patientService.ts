import { Patient, OccupationalHealthCareEntry, HospitalEntry } from '../types';


const patients: Patient[] = [
  {
    id: "1",
    name: "John Doe",
    ssn: "123-45-6789",
    occupation: "Engineer",
    gender: "male",
    dateOfBirth: "1980-01-01",
    entries: [
      {
        type: "OccupationalHealthCare",
        description: "Routine check-up",
        date: "2024-02-10",
        specialist: "Dr. Smith",
        employerName: "Tech Corp"
      },
      {
        type: "Hospital",
        description: "Emergency surgery",
        date: "2024-03-15",
        discharge: {
          date: "2024-03-20",
          criteria: "Stable condition"
        },
        specialist: "Dr. White"
      }
    ]
  }

];


const getPatientById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

export default {
  getPatientById
};
