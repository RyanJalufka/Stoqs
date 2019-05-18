import React from 'react';
import Clock from 'react-live-clock';

const ClockComponent = () => {

  var currentTime = new Date(),
  hours = currentTime.getUTCHours();

  let message = '';

  if (hours>=21) { message = '(Market closed)'}

  return (
    <div>
    <Clock
    format={'h:mm:ssa'}
    ticking={true}
    timezone={'America/New_York'} /> {message}
    </div>
  );
}

export default ClockComponent;