import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Paper } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: string;
  dateOfBirth: string;
}

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtén el ID de la URL
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/patients/${id}`);
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient data", error);
      }
    };

    if (id) {
      fetchPatient();
    }
  }, [id]);

  if (!patient) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h4">{patient.name}</Typography>
        <Typography variant="h6">Occupation: {patient.occupation}</Typography>
        <Typography variant="body1">Date of Birth: {patient.dateOfBirth}</Typography>
        <Typography variant="body1">
          Gender: {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
        </Typography>
      </Paper>
    </Box>
  );
};

export default PatientPage;
