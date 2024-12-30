import React, { createContext, useContext, useReducer } from "react";
import { Diagnose, Patient } from "./types";

type State = {
  patients: { [id: string]: Patient };
  diagnoses: { [code: string]: Diagnose };
};

type Action =
  | { type: "SET_PATIENTS"; payload: { [id: string]: Patient } }
  | { type: "SET_DIAGNOSES"; payload: { [code: string]: Diagnose } };

const initialState: State = {
  patients: {},
  diagnoses: {}
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENTS":
      return { ...state, patients: action.payload };
    case "SET_DIAGNOSES":
      return { ...state, diagnoses: action.payload };
    default:
      return state;
  }
};

const StateContext = createContext<[State, React.Dispatch<Action>] | undefined>(undefined);

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <StateContext.Provider value={[state, dispatch]}>{children}</StateContext.Provider>;
};

export const useStateValue = () => {
  const context = useContext(StateContext);
  if (!context) throw new Error("useStateValue must be used within a StateProvider");
  return context;
};


