import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Patient } from "../types";

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [state] = useStateValue();
  const patient = state.patients[id || ""];

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
                      <li key={code}>
                        {code} - {state.diagnoses[code]?.name || "Unknown diagnosis"}
                      </li>
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

