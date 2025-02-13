import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/userAuth';
import Auth from './components/Auth';

const AuthenticationPage = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="forgot-password" element={<Auth />} />
      <Route path="reset-password/:token" element={<Auth />} />
      <Route path="register" element={<Auth />} />
    </Routes>
  );
};

export default AuthenticationPage;
