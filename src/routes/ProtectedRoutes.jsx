import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

ProtectedRoutes.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoutes;
