import React from "react";
import { Entry } from "../types";
import { useStateValue } from "../state";
import { Card, CardContent, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FavoriteIcon from "@mui/icons-material/Favorite";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled type: ${JSON.stringify(value)}`);
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  const renderDiagnoses = (codes?: Array<string>) =>
    codes ? (
      <ul>
        {codes.map((code) => (
          <li key={code}>
            {code} - {diagnoses[code]?.name || "Unknown"}
          </li>
        ))}
      </ul>
    ) : null;

  switch (entry.type) {
    case "HealthCheck":
      return (
        <Card variant="outlined" style={{ marginBottom: "1em" }}>
          <CardContent>
            <Typography variant="h6">
              <FavoriteIcon /> Health Check - {entry.date}
            </Typography>
            <Typography>{entry.description}</Typography>
            <Typography>
              Health Rating: <FavoriteIcon color={entry.healthCheckRating === 0 ? "success" : "error"} />
            </Typography>
            {renderDiagnoses(entry.diagnoseCodes)}
          </CardContent>
        </Card>
      );
    case "OccupationalHealthcare":
      return (
        <Card variant="outlined" style={{ marginBottom: "1em" }}>
          <CardContent>
            <Typography variant="h6">
              <WorkIcon /> Occupational Healthcare - {entry.date}
            </Typography>
            <Typography>Employer: {entry.employerName}</Typography>
            <Typography>{entry.description}</Typography>
            {entry.sickLeave && (
              <Typography>
                Sick Leave: {entry.sickLeave.st
