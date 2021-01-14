"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const listOfPatients = patients_1.default;
const getNonSensitiveData = () => {
    const nonSensitivePatientsData = listOfPatients.map(patient => {
        return {
            id: patient.id,
            name: patient.name,
            gender: patient.gender,
            dateOfBirth: patient.dateOfBirth,
            occupation: patient.occupation
        };
    });
    return nonSensitivePatientsData;
};
const addNewPatient = (newPatient) => {
    listOfPatients.push(newPatient);
    return newPatient;
};
const getAPatient = (id) => {
    const patient = listOfPatients.find(patient => patient.id.normalize() === id.normalize());
    return patient;
};
const addEntryToPatient = (newEntry, patientID) => {
    var _a;
    const patientFound = listOfPatients.find(patient => patient.id === patientID);
    if (!patientFound) {
        return null;
    }
    (_a = listOfPatients.find(patient => patient.id === patientID)) === null || _a === void 0 ? void 0 : _a.entries.push(newEntry);
    return newEntry;
};
exports.default = {
    getNonSensitiveData,
    addNewPatient,
    getAPatient,
    addEntryToPatient
};
