import React from 'react';
import { HospitalEntry as HospitalProps } from '../types';
import { Segment, Icon } from 'semantic-ui-react';

interface HospitalEntryProps {
  entry: HospitalProps;
}
const HospitalEntry: React.FC<HospitalEntryProps> = ({ entry }) => {
  return(
    <Segment>
      <h3>
        {entry.date} <Icon name="hospital" size="large"/>
      </h3>
      {entry.description}
      {entry.discharge.date}: {entry.discharge.criteria}
    </Segment>
  );
};

export default HospitalEntry;