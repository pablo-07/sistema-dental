import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ path, allowedRoles, element }) => {
  const { isAuth, userRole } = useSelector((state) => state.auth);

  if (isAuth && allowedRoles.includes(userRole)) {
    return <Route path={path} element={element} />;
  } else {
    return <Navigate to='/login' />;
  }
};

export default PrivateRoute;
