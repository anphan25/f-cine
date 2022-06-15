import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginFail } from "redux/auth/AuthSlice";

const ProtectedRoutes = ({ children, roles }) => {
  let { Role } = useSelector((state) => state.auth.auth.user);
  const dispatch = useDispatch();

  if (Role === "Customer") {
    dispatch(loginFail("You don't have permision to login this system"));
    return <Navigate to="/login" />;
  }

  if (!roles.includes(Role)) {
    return <Navigate to="/permission-denied" />;
  }

  return children;
};

ProtectedRoutes.propTypes = {
  roles: PropTypes.array,
  children: PropTypes.node,
};

export default ProtectedRoutes;
