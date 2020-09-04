import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Togglable = (props) => {
  const [visibility, setVisibility] = useState(false);

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const hideWhenVisible = { display: visibility? 'none': '' };
  const showWhenVisible = { display: visibility? '': 'none' };

  return(
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => toggleVisibility()}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={() => toggleVisibility()}>cancel</button>
      </div>
    </div>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
};

Togglable.displayName = 'Togglable';

export default Togglable;