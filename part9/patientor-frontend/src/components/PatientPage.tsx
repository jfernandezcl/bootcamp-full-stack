import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PatientEntryForm from './PatientEntryForm';

interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: string;
  dateOfBirth: string;
  entries: Array<any>;
}

const PatientPage: React.FC<{ patientId: string }> = ({ patientId }) => {
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`/api/patients/${patientId}`);
        setPatient(response.data);
      } catch (error) {
        console.error('Error fetching patient data', error);
      }
    };

    fetchPatientData();
  }, [patientId]);

  const handleEntryAdded = () => {
    // Actualizar las entradas al agregar una nueva
    if (patient) {
      axios.get(`/api/patients/${patientId}`).then((response) => {
        setPatient(response.data);
      });
    }
  };

  if (!patient) {
    return <div>Cargando datos del paciente...</div>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>SSN: {patient.ssn}</p>
      <p>Fecha de nacimiento: {patient.dateOfBirth}</p>
      <p>Ocupación: {patient.occupation}</p>

      <h3>Entradas</h3>
      <ul>
        {patient.entries.map((entry: any) => (
          <li key={entry.id}>
            <strong>{entry.date}</strong> - {entry.description}
          </li>
        ))}
      </ul>

      <PatientEntryForm patientId={patientId} onEntryAdded={handleEntryAdded} />
    </div>
  );
};

export default PatientPage;
