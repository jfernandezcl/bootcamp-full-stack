import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  patientId: string;
  onEntryAdded: () => void; // Callback para actualizar las entradas del paciente
}

const PatientEntryForm: React.FC<Props> = ({ patientId, onEntryAdded }) => {
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Construir el objeto de la nueva entrada
    const entry = {
      type: 'HealthCheck',
      date: new Date().toISOString(),
      description,
      specialist,
      healthCheckRating,
      diagnosisCodes,
    };

    try {
      // Enviar la entrada al backend
      await axios.post(`/api/patients/${patientId}/entries`, entry);

      // Si la entrada es exitosa, actualizamos las entradas del paciente
      onEntryAdded();
      setDescription('');
      setSpecialist('');
      setHealthCheckRating(0);
      setDiagnosisCodes([]);
      setError(''); // Limpiar cualquier mensaje de error
    } catch (err: any) {
      // Si hay un error en el backend (por ejemplo, datos inválidos)
      setError(err.response?.data?.error || 'Error al agregar la entrada');
    }
  };

  return (
    <div>
      <h3>Agregar Entrada de Control de Salud</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Especialista:</label>
          <input
            type="text"
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          />
        </div>
        <div>
          <label>Health Check Rating (0-3):</label>
          <input
            type="number"
            min="0"
            max="3"
            value={healthCheckRating}
            onChange={(e) => setHealthCheckRating(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Códigos de Diagnóstico:</label>
          <input
            type="text"
            value={diagnosisCodes.join(', ')}
            onChange={(e) => setDiagnosisCodes(e.target.value.split(',').map(code => code.trim()))}
          />
        </div>
        <div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        <button type="submit">Agregar Entrada</button>
      </form>
    </div>
  );
};

export default PatientEntryForm;
