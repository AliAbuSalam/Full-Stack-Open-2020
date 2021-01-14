import React from 'react';
import { Tab } from 'semantic-ui-react';
import HealthCheckRatingEntry from './HealthCheckRatingEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

enum EntryType {
  HealthCheck = 'healthcheck',
  Hospital = 'hospital',
  OccupationalHealthcare = 'occupationalhealthcare'
}
type EntryOption = {
  value: EntryType;
  label: string;
};

type EntryFormProps = {
  handleSubmit: <T>(values: T) => void;
};

const AddEntryForm: React.FC<EntryFormProps> = ({ handleSubmit }) => {

  const HealthCheckRender = () => {
    return(
      <HealthCheckRatingEntry handleSubmit={handleSubmit}/>
    );
  };

  const HospitalFormRender = () => {
    return(
      <HospitalEntry handleSubmit={handleSubmit}/>
    );
  };

  const OccupationalHealthcareRender = () => {
    return(
      <OccupationalHealthcareEntry handleSubmit={handleSubmit}/>
    );
  };

  const panes = [
    { menuItem: 'Healthcheck', render: HealthCheckRender},
    { menuItem: 'Hospital', render: HospitalFormRender},
    { menuItem: 'Occupational Healthcare', render: OccupationalHealthcareRender}
  ];

  return(
    <div>
      <Tab panes={panes}/>
    </div>
  );
};

export default AddEntryForm;