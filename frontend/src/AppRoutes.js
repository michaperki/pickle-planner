import React from 'react';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Logout from './components/auth/Logout';
import Navigation from './components/layout/Navigation';
import { useAuth } from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function AppRoutes() {
  const { currentUser } = useAuth();

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {currentUser ? (
          <Route path="/logout" element={<Logout />} />
        ) : (
          <Route path="/logout" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
