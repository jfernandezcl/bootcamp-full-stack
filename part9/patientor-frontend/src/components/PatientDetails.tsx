import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Patient, Entry } from "../types";

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data } = await axios.get<Patient>(`http://localhost:3001/api/patients/${id}`);
        setPatient(data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatient();
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>Gender: {patient.gender}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>Date of Birth: {patient.dateOfBirth}</p>

      <h3>Entries</h3>
      {patient.entries.length === 0 ? (
        <p>No entries available.</p>
      ) : (
        <ul>
          {patient.entries.map((entry, index) => (
            <li key={index}>
              <p><strong>Date:</strong> {entry.date}</p>
              <p><strong>Description:</strong> {entry.description}</p>
              {entry.diagnoseCodes && (
                <div>
                  <strong>Diagnose Codes:</strong>
                  <ul>
                    {entry.diagnoseCodes.map((code) => (
                      <li key={code}>{code}</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientDetails;
