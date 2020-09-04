import React from 'react';

const notification = ({ message, type, id }) => {
  if(message === null){
    return(null);
  }
  return(
    <div id={id} className={type}>
      {message}
    </div>
  );
};

export default notification;