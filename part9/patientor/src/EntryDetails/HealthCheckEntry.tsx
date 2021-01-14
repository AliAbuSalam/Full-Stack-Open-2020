import React from 'react';
import { HealthCheckEntry } from '../types';
import { Icon, Segment } from 'semantic-ui-react';

interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
}
const HealthCheckEntryComponent: React.FC<HealthCheckEntryProps> = ({ entry }) => {
  let healthColor: 'green'| 'orange' | 'yellow' | 'red';

  switch(entry.healthCheckRating){
    case 0:
      healthColor = 'green';
      break;
    case 1:
      healthColor = 'orange';
      break;
    case 2:
      healthColor = 'yellow';
      break;
    default:
      healthColor = 'red';
  }
  return(
    <Segment raised>
      <h3>
        {entry.date} <Icon name='user md' size='large' />
      </h3>
      {entry.description}
      <div>
        <Icon name='heart' color={healthColor}/>
      </div>
    </Segment>
  );
};

export default HealthCheckEntryComponent;