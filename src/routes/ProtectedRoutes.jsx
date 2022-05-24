import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoutes = ({ roles, children }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  if (!roles.includes(role)) {
    return <Navigate to="/permission-denied" />;
  }

  return children;
};

ProtectedRoutes.propTypes = {
  roles: PropTypes.array,
  children: PropTypes.node,
};

export default ProtectedRoutes;
