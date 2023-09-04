import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import Toggle from '../common/Toggle';

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className={`${theme === 'light' ? 'light' : 'dark'} bg-blue-500 py-2 px-4`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className={`${theme === 'light' ? 'text-black' : 'text-white'} text-lg font-bold`}>
          Home
        </Link>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? 'Close' : 'Menu'}
        </button>

        <ul className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block space-x-4 md:space-x-0 md:space-y-0 mt-4 md:mt-0`}>
          {!user ? (
            <>
              <li>
                <Link to="/login" className={`${theme === 'light' ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-200'}`}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className={`${theme === 'light' ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-200'}`}>
                  Register
                </Link>
              </li>

            </>
          ) : (
            <li>
              <Link to="/" onClick={handleLogout} className={`${theme === 'light' ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-200'}`}>
                Logout
              </Link>
            </li>
          )}
          <li>
            <Toggle />
          </li>
        </ul>

      </div>
    </nav>
  );
};

export default Navigation;
