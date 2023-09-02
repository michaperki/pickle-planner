// src/components/auth/Login.js
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const { login } = useAuth();

  const handleLogin = () => {
    // Implement login functionality here
  };

  return (
    <div>
      <h2>Login</h2>
      {/* Implement login form and button */}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
