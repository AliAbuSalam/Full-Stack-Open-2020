import React from 'react';
import { Entry } from '../types';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled type entry: ${value}`);
};

interface EntryDetailsProps {
  entry: Entry;
}
const EntryDetails: React.FC<EntryDetailsProps> = ({ entry }) => {
  switch(entry.type){
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry}/>;
    case 'Hospital':
      return <HospitalEntry entry={entry}/>;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry}/>;
    default:
      return assertNever(entry);
  }
};



export default EntryDetails;