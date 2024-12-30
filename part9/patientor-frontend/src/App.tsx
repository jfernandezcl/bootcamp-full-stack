import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PatientDetails from "./components/PatientDetails";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientListPage />} />
        <Route path="/patients/:id" element={<PatientDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

