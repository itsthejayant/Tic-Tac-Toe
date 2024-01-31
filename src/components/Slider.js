// ToggleButton.js

import React, { useState } from 'react';
// import './ToggleButton.css'; // Import your CSS file for styling

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn((prevIsOn) => !prevIsOn);
  };

  return (
    <div className={`toggle-container ${isOn ? 'on' : 'off'}`} onClick={handleToggle}>
      <div className="toggle-button"></div>
    </div>
  );
};

export default ToggleButton;
