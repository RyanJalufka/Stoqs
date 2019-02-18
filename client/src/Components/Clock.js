import React from 'react';
import Clock from 'react-live-clock';

const ClockComponent = () => {
  return (
    <Clock
    format={'h:mm:ssa'}
    ticking={true}
    timezone={'America/New_York'} />
  );
}

export default ClockComponent;