import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import EntryDetails from "./EntryDetails";

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
      {patient.entries.le

