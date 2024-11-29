import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PublicRoutes = ({ isLoggedIn }) => {
  return !isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoutes;
