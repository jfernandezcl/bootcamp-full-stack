import React, { useState, useEffect } from 'react';
import PatientEntryForm from './PatientEntryForm';

const PatientPage: React.FC<{ patientId: string }> = ({ patientId }) => {
  const [patient, setPatient] = useState(null);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // Fetch paciente y sus entradas
  }, [patientId]);

  const addEntry = (entry) => {
    // Llamar al backend para agregar la entrada
  };

  return (
    <div>
      <h2>Información del Paciente</h2>
      <div>{patient?.name}</div>
      <h3>Entradas</h3>
      <PatientEntryForm patientId={patientId} addEntry={addEntry} />
      <div>
        {entries.map((entry, index) => (
          <div key={index}>{entry.description}</div>
        ))}
      </div>
    </div>
  );
};

export default PatientPage;
