import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthRoutes = ({ children }) => {
  let { auth } = useSelector((state) => state.auth);

  if (!auth) {
    return <Navigate to="/login" />;
  }
  return children;
};

AuthRoutes.propTypes = {
  roles: PropTypes.array,
  children: PropTypes.node,
};

export default AuthRoutes;
