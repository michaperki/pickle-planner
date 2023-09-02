// src/components/layout/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navigation = () => {
  const { user } = useAuth();

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
            <Link to="/logout">Logout</Link> {/* Renders "Logout" when the user is logged in */}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
