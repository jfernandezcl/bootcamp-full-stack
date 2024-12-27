import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

interface Patient {
  id: string;
  name: string;
}

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/patients');
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <List>
      {patients.map(patient => (
        <ListItem key={patient.id}>
          <ListItemText
            primary={<Link to={`/patients/${patient.id}`}>{patient.name}</Link>}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default PatientList;
