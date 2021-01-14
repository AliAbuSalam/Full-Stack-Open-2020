import patientsData from '../../data/patients';
import { Patient, PublicPatient, Entry } from '../types';

const listOfPatients: Patient[] = patientsData;

const getNonSensitiveData = (): PublicPatient[] => {
  const nonSensitivePatientsData = listOfPatients.map(patient => {
    return {
      id: patient.id,
      name: patient.name,
      gender: patient.gender,
      dateOfBirth: patient.dateOfBirth,
      occupation: patient.occupation
    }
    
  });
  return nonSensitivePatientsData;
};

const addNewPatient = (newPatient: Patient): Patient => {
  listOfPatients.push(newPatient);
  return newPatient;
};

const getAPatient = (id: string): Patient | undefined => {
  const patient = listOfPatients.find(patient => patient.id.normalize() === id.normalize());
  return patient;
};

const addEntryToPatient = (newEntry: Entry, patientID: string): Entry | null => {
  const patientFound = listOfPatients.find(patient => patient.id === patientID);
  if(!patientFound){
    return null;
  }
  listOfPatients.find(patient => patient.id === patientID)?.entries.push(newEntry);
  return newEntry;
};

export default {
  getNonSensitiveData,
  addNewPatient,
  getAPatient,
  addEntryToPatient
}