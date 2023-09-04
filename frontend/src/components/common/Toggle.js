import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Toggle = () => {
  const { darkTheme, toggleTheme } = useTheme();

  return (
    <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        checked={darkTheme}
        onChange={toggleTheme}
        className={`${
          darkTheme ? 'bg-blue-600' : 'bg-gray-300'
        } relative w-6 h-6 rounded-full shadow-inner transition-transform duration-200 ease-in transform translate-x-0`}
      />

    </div>
  );
};

export default Toggle;
