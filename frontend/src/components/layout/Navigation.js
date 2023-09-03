import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navigation = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout(); // Trigger the logout logic
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!user ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
