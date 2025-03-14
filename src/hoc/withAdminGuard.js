import React from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTERS } from '../utils/router';


// HOC phan quyen admin
const withAdminGuard = (WrappedComponent) => {
  return (props) => {
    const isAuthenticated = !!localStorage.getItem('token');
    const userRole = localStorage.getItem('roles');

    if (!isAuthenticated) {
      return <Navigate to={ROUTERS.USER.LOGIN} replace />;
    }


    if (userRole !== 'ROLE_ADMIN') {
      return <Navigate to={ROUTERS.USER.HOME} replace />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAdminGuard;
