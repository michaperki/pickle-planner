// src/components/common/Toggle.js
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Toggle = () => {
  const { darkTheme, toggleTheme } = useTheme();

  return (
    <div>
      <label>
        <input type="checkbox" checked={darkTheme} onChange={toggleTheme} />
        Toggle Theme
      </label>
    </div>
  );
};

export default Toggle;
    