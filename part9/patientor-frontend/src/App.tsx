import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PatientList from './components/PatientList';
import PatientPage from './components/PatientPage';
import { Container, Typography } from '@mui/material';

const App: React.FC = () => {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Patientor
      </Typography>
      <Routes>
        <Route path="/" element={<PatientList />} />
        <Route path="/patients/:id" element={<PatientPage />} />
      </Routes>
    </Container>
  );
};

export default App;

