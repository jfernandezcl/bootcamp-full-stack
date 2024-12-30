import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl, Button, FormHelperText } from '@mui/material';
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types/entry';

interface PatientEntryFormProps {
  patientId: string;
  addEntry: (entry: Entry) => void;
  diagnosisCodes: string[]; // Lista de códigos de diagnóstico disponibles
}

const PatientEntryForm: React.FC<PatientEntryFormProps> = ({ patientId, addEntry, diagnosisCodes }) => {
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
  const [selectedDiagnosisCodes, setSelectedDiagnosisCodes] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let entry: Entry;
    if (type === 'HealthCheck') {
      entry = { type, description, date, specialist, healthCheckRating, diagnosisCodes: selectedDiagnosisCodes };
    } else if (type === 'Hospital') {
      entry = { type, description, date, specialist, discharge: { date: dischargeDate, criteria: dischargeCriteria }, diagnosisCodes: selectedDiagnosisCodes };
    } else {
      entry = { type, description, date, specialist, employerName, sickLeave: sickLeaveStartDate && sickLeaveEndDate ? { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate } : undefined, diagnosisCodes: selectedDiagnosisCodes };
    }

    addEntry(entry);
  };

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <FormControl fullWidth margin="normal">
        <InputLabel>Tipo de Entrada</InputLabel>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value as 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare')}
          label="Tipo de Entrada"
        >
          <MenuItem value="HealthCheck">Salud</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">Salud Laboral</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Fecha"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        label="Especialista"
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
        fullWidth
        margin="normal"
      />

      {type === 'HealthCheck' && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Rating de Salud</InputLabel>
          <Select
            value={healthCheckRating}
            onChange={(e) => setHealthCheckRating(Number(e.target.value))}
            label="Rating de Salud"
          >
            <MenuItem value={0}>0 - No riesgo</MenuItem>
            <MenuItem value={1}>1 - Bajo riesgo</MenuItem>
            <MenuItem value={2}>2 - Riesgo medio</MenuItem>
            <MenuItem value={3}>3 - Alto riesgo</MenuItem>
          </Select>
        </FormControl>
      )}

      {type === 'Hospital' && (
        <>
          <TextField
            label="Fecha de Alta"
            type="date"
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Criterio de Alta"
            value={dischargeCriteria}
            onChange={(e) => setDischargeCriteria(e.target.value)}
            fullWidth
            margin="normal"
          />
        </>
      )}

      {type === 'OccupationalHealthcare' && (
        <>
          <TextField
            label="Nombre del Empleador"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Fecha de Baja (Inicio)"
            type="date"
            value={sickLeaveStartDate}
            onChange={(e) => setSickLeaveStartDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Fecha de Baja (Fin)"
            type="date"
            value={sickLeaveEndDate}
            onChange={(e) => setSickLeaveEndDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </>
      )}

      {/* Diagnóstico: Multiple Select de Material UI */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Códigos de Diagnóstico</InputLabel>
        <Select
          multiple
          value={selectedDiagnosisCodes}
          onChange={(e) => setSelectedDiagnosisCodes(e.target.value as string[])}
          label="Códigos de Diagnóstico"
        >
          {diagnosisCodes.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Selecciona los códigos de diagnóstico</FormHelperText>
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        Agregar Entrada
      </Button>
    </form>
  );
};

export default PatientEntryForm;
