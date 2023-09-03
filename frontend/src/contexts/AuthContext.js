import React, { createContext, useContext, useState } from 'react';
import { logoutUser } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = (accessToken) => {
    setToken(accessToken); // Store the token
  };

  const logout = () => {
    setToken(null); // Clear the token
  };

  const isAuthenticated = () => !!token; // Check if a token exists
  const user = isAuthenticated() ? {} : null;

  const value = {
    isAuthenticated,
    login,
    logout,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

