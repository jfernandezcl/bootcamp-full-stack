import React, { useEffect } from "react";
import axios from "axios";
import { useStateValue } from "./state";
import { Diagnose } from "./types";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnoses } = await axios.get<Diagnose[]>("http://localhost:3001/api/diagnoses");
        const diagnosesMap = Object.fromEntries(diagnoses.map((d) => [d.code, d]));
        dispatch({ type: "SET_DIAGNOSES", payload: diagnosesMap });
      } catch (error) {
        console.error("Error fetching diagnoses:", error);
      }
    };

    fetchDiagnoses();
  }, [dispatch]);

  return (
    <div>
      {/* Your routing and components go here */}
    </div>
  );
};

export default App;
