import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoutes = ({ roles, children }) => {
  let { auth } = useSelector((state) => state.auth);

  if (!auth) {
    console.log(auth);
    return <Navigate to="/login" />;
  }

  if (!roles.includes(auth?.user.role)) {
    return <Navigate to="/permission-denied" />;
  }

  return children;
};

ProtectedRoutes.propTypes = {
  roles: PropTypes.array,
  children: PropTypes.node,
};

export default ProtectedRoutes;
