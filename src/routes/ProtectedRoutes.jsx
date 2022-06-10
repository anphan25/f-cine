import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children, roles }) => {
  let { Role } = useSelector((state) => state.auth.auth.user);

  if (!roles.includes(Role)) {
    console.log(Role, roles);
    return <Navigate to="/permission-denied" />;
  }

  return children;
};

ProtectedRoutes.propTypes = {
  roles: PropTypes.array,
  children: PropTypes.node,
};

export default ProtectedRoutes;
