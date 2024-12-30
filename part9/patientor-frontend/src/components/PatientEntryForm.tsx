import React, { useState } from 'react';
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types/entry';

const PatientEntryForm: React.FC<{ patientId: string, addEntry: (entry: Entry) => void }> = ({ patientId, addEntry }) => {
  const [type, setType] = useState<'HealthCheck' | 'Hospital' | 'OccupationalHealthcare'>('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let entry: Entry;
    if (type === 'HealthCheck') {
      entry = { type, description, date, specialist, healthCheckRating };
    } else if (type === 'Hospital') {
      entry = { type, description, date, specialist, discharge: { date: dischargeDate, criteria: dischargeCriteria } };
    } else {
      entry = { type, description, date, specialist, employerName, sickLeave: sickLeaveStartDate && sickLeaveEndDate ? { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate } : undefined };
    }

    addEntry(entry); // Aquí llamaríamos al prop que pasamos para agregar la entrada
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Tipo de Entrada:</label>
        <select value={type} onChange={(e) => setType(e.target.value as 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare')}>
          <option value="HealthCheck">Salud</option>
          <option value="Hospital">Hospital</option>
          <option value="OccupationalHealthcare">Salud Laboral</option>
        </select>
      </div>

      <div>
        <label>Descripción:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div>
        <label>Fecha:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div>
        <label>Especialista:</label>
        <input type="text" value={specialist} onChange={(e) => setSpecialist(e.target.value)} />
      </div>

      {type === 'HealthCheck' && (
        <div>
          <label>Rating de Salud:</label>
          <input type="number" value={healthCheckRating} onChange={(e) => setHealthCheckRating(Number(e.target.value))} />
        </div>
      )}

      {type === 'Hospital' && (
        <>
          <div>
            <label>Fecha de Alta:</label>
            <input type="date" value={dischargeDate} onChange={(e) => setDischargeDate(e.target.value)} />
          </div>
          <div>
            <label>Criterio de Alta:</label>
            <input type="text" value={dischargeCriteria} onChange={(e) => setDischargeCriteria(e.target.value)} />
          </div>
        </>
      )}

      {type === 'OccupationalHealthcare' && (
        <>
          <div>
            <label>Nombre de Empleador:</label>
            <input type="text" value={employerName} onChange={(e) => setEmployerName(e.target.value)} />
          </div>
          <div>
            <label>Fecha de Baja (Inicio):</label>
            <input type="date" value={sickLeaveStartDate} onChange={(e) => setSickLeaveStartDate(e.target.value)} />
          </div>
          <div>
            <label>Fecha de Baja (Fin):</label>
            <input type="date" value={sickLeaveEndDate} onChange={(e) => setSickLeaveEndDate(e.target.value)} />
          </div>
        </>
      )}

      <button type="submit">Agregar Entrada</button>
    </form>
  );
};

export default PatientEntryForm;
