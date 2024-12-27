import React, { useState } from 'react';

interface Entry {
  date: string;
  description: string;
  flightHours: number;
}

const AddEntryForm: React.FC = () => {
  const [entry, setEntry] = useState<Entry>({
    date: '',
    description: '',
    flightHours: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEntry({
      ...entry,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3001/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });

    if (response.ok) {
      console.log('New entry added successfully');
      // Puedes agregar una lógica para mostrar un mensaje de éxito o limpiar el formulario
    } else {
      console.error('Failed to add new entry');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date</label>
        <input
          type="text"
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
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default AddEntryForm;
