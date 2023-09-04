import React from 'react';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Header from './components/layout/Header';
import { useAuth } from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Router basename="/pickle-planner">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/protected" element={<Dashboard user={user} />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
