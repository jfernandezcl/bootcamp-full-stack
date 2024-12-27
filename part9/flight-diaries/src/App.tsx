import React, { useState, useEffect } from 'react';
import AddEntryForm from './components/AddEntryForm';

interface Entry {
  id: number;
  date: string;
  description: string;
  flightHours: number;
}

const App: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  // Obtener las entradas del backend
  useEffect(() => {
    const fetchEntries = async () => {
      const response = await fetch('http://localhost:3001/api/entries');
      const data = await response.json();
      setEntries(data);
    };

    fetchEntries();
  }, []);

  return (
    <div>
      <h1>Flight Log</h1>

      {/* Mostrar las entradas */}
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <strong>{entry.date}</strong>
            <p>{entry.description}</p>
            <p>Flight hours: {entry.flightHours}</p>
          </li>
        ))}
      </ul>

      {/* Formulario para agregar nueva entrada */}
      <AddEntryForm />
    </div>
  );
};

export default App;

