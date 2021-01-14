import React from 'react';
import { OccupationalHealthCareEntry } from '../types';
import { Segment, Icon } from 'semantic-ui-react';

interface OccupationalHealthCareEntryProps {
  entry: OccupationalHealthCareEntry;
}
const OccupationalHealthcareEntryComponent: 
  React.FC<OccupationalHealthCareEntryProps> = ({ entry }) => {
    return(
      <Segment>
        <h3>
          {entry.date} <Icon name='stethoscope' size='large'/> {entry.employerName}
        </h3>
        {entry.description}
      </Segment>
    );
};

export default OccupationalHealthcareEntryComponent;