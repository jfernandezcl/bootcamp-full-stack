import React, { useState } from 'react';

// Tipado para las entradas de diario
interface Entry {
  date: string;
  description: string;
  flightHours: number;
  weather: 'sunny' | 'cloudy' | 'rainy'; // Añadimos el clima
  visibility: 'good' | 'poor'; // Añadimos la visibilidad
}

const AddEntryForm: React.FC = () => {
  const [entry, setEntry] = useState<Entry>({
    date: '',
    description: '',
    flightHours: 0,
    weather: 'sunny', // Valor por defecto para el clima
    visibility: 'good', // Valor por defecto para la visibilidad
  });
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEntry({
      ...entry,
      [name]: value,
    });
  };

  // Función para manejar los cambios en los radio buttons
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEntry({
      ...entry,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reseteamos el error en cada envío de formulario

    try {
      const response = await fetch('http://localhost:3001/api/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al agregar la entrada');
      }

      console.log('New entry added successfully');
      // Puedes agregar lógica para limpiar el formulario o mostrar un mensaje de éxito
    } catch (error: any) {
      setError(error.message); // Capturamos el error y lo mostramos en el estado
      console.error('Failed to add new entry:', error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={entry.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={entry.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Flight Hours</label>
          <input
            type="number"
            name="flightHours"
            value={entry.flightHours}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Weather</label>
          <label>
            <input
              type="radio"
              name="weather"
              value="sunny"
              checked={entry.weather === 'sunny'}
              onChange={handleRadioChange}
            />
            Sunny
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="cloudy"
              checked={entry.weather === 'cloudy'}
              onChange={handleRadioChange}
            />
            Cloudy
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="rainy"
              checked={entry.weather === 'rainy'}
              onChange={handleRadioChange}
            />
            Rainy
          </label>
        </div>
        <div>
          <label>Visibility</label>
          <label>
            <input
              type="radio"
              name="visibility"
              value="good"
              checked={entry.visibility === 'good'}
              onChange={handleRadioChange}
            />
            Good
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value="poor"
              checked={entry.visibility === 'poor'}
              onChange={handleRadioChange}
            />
            Poor
          </label>
        </div>
        <button type="submit">Add Entry</button>
      </form>

      {/* Mostrar el error si ocurrió */}
      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          <strong>Error: </strong>{error}
        </div>
      )}
    </div>
  );
};

export default AddEntryForm;


