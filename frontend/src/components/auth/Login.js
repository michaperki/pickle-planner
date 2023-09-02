// src/components/auth/Login.js
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { loginUser } from '../../services/api'; // Import the API function

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await loginUser(username, password);

      // Assuming your backend returns a token upon successful login
      if (response.token) {
        login(response.token); // Store the token in your authentication context
        // Redirect to a protected route or perform any other actions
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('Login failed. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
