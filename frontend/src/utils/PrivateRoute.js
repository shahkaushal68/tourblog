import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //let authToken = user?.token
  //console.log("token", user.token);
  return user?.token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
