import React from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

const LoadingSpinner = () => (
  <Segment>
    <Dimmer active style={{padding:"40px"}}>
      <Loader size="massive" />
    </Dimmer>
  </Segment>
);

export default LoadingSpinner;
