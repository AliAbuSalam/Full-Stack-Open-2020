"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEntry = void 0;
const types_1 = require("./types");
const parseToPatient = (data) => {
    const patient = {
        id: (Math.random() * 10000).toString(),
        name: parseName(data.name),
        ssn: parseSsn(data.ssn),
        dateOfBirth: parseDateOfBirth(data.dateOfBirth),
        occupation: parseOccupation(data.occupation),
        gender: parseGender(data.gender),
        entries: parseEntriesArray(data.entries)
    };
    return patient;
};
const parseName = (data) => {
    if (!data || !isString(data)) {
        throw new Error('Incorrect or missing name! ' + data);
    }
    return data;
};
const isString = (possiblyString) => {
    return typeof possiblyString === 'string' || possiblyString instanceof String;
};
const parseSsn = (data) => {
    if (!data || !isString(data)) {
        throw new Error('Incorrect or missing ssn! ' + data);
    }
    return data;
};
const parseDateOfBirth = (data) => {
    if (!data || !isString(data) || !isDate(data)) {
        throw new Error('Incorrect or missing date of birth! ' + data);
    }
    return data;
};
const isDate = (possiblyDate) => {
    possiblyDate = possiblyDate.trim();
    const haveCorrectLength = possiblyDate.length === 10;
    const year = Number.parseInt(possiblyDate.substring(0, 4));
    const haveCorrectYear = year >= 0 && !Number.isNaN(year);
    const month = Number.parseInt(possiblyDate.substring(5, 7));
    const haveCorrectMonth = month > 0 && month <= 12 && !Number.isNaN(month);
    const day = Number.parseInt(possiblyDate.substring(8, 10));
    const haveCorrectDay = day > 0 && day <= 31 && !Number.isNaN(day);
    const haveCorrectStrip = possiblyDate.charAt(4) === '-' && possiblyDate.charAt(7) === '-';
    return haveCorrectLength && haveCorrectYear && haveCorrectMonth && haveCorrectDay && haveCorrectStrip;
};
const parseOccupation = (data) => {
    if (!data || !isString(data)) {
        throw new Error('Incorrect or missing occupation! ' + data);
    }
    return data;
};
const parseGender = (data) => {
    if (!data || !isGender(data)) {
        throw new Error('Incorrect or missing gender! ' + data);
    }
    return data;
};
const isGender = (data) => {
    return Object.values(types_1.Gender).includes(data);
};
const parseEntriesArray = (data) => {
    if (!Array.isArray(data)) {
        throw new Error('Incorrect or missing Entry ' + data);
    }
    if (Array.isArray(data) && data.length === 0) {
        return [];
    }
    let entriesArray = data.map(entry => {
        return exports.parseEntry(entry);
    });
    return entriesArray;
};
const parseEntry = (data) => {
    if (!isString(data.type)) {
        throw new Error('Incorrect or missing Entry ' + data);
    }
    const isOccupationalHealthcare = data.type === 'OccupationalHealthcare';
    const isHospital = data.type === 'Hospital';
    const isHealthCheck = data.type === 'HealthCheck';
    if (!isOccupationalHealthcare && !isHospital && !isHealthCheck) {
        throw new Error('Incorrect or missing Entry' + data);
    }
    return data;
};
exports.parseEntry = parseEntry;
exports.default = parseToPatient;
