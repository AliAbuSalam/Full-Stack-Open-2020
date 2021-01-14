import { State } from "./state";
import { Diagnosis, Patient } from "../types";

type SetPatientList = {
  type: "SET_PATIENT_LIST";
  payload: Patient[];
};

type AddPatient = {
  type: "ADD_PATIENT";
  payload: Patient;
};

type UpdateDataSensitivePatient = {
  type: "UPDATE_DATA_SENSITIVE_PATIENT";
  payload: Patient;
};

type SetDiagnosisList = {
  type: "SET_DIAGNOSIS_LIST";
  payload: Diagnosis[];
};


export type Action = | SetPatientList | AddPatient | UpdateDataSensitivePatient | SetDiagnosisList;
  
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        },
        diagnosis: {
          ...state.diagnosis
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        },
        diagnosis: {
          ...state.diagnosis
        }
      };
    case "UPDATE_DATA_SENSITIVE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        },
        diagnosis: {
          ...state.diagnosis
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        patients: {
          ...state.patients
        },
        diagnosis: {
          ...action.payload.reduce((memo, diagnosis) => ({
            ...memo,
            [diagnosis.code]: diagnosis
          }), {}),
          ...state.diagnosis 
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (payload: Patient[]): SetPatientList => {
  return {
    type: "SET_PATIENT_LIST",
    payload
  };
};

export const addPatient = (payload: Patient): AddPatient => {
  return {
    type: "ADD_PATIENT",
    payload
  };
};

export const updatePatient = (payload: Patient): UpdateDataSensitivePatient => {
  return {
    type: "UPDATE_DATA_SENSITIVE_PATIENT",
    payload
  };
};

export const setDiagnosisList = (payload: Diagnosis[]): SetDiagnosisList => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload
  };
};