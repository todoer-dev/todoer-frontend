import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { userService } from '../../services/UserService';

const PrivateRoute = ({ component: ProtectedComponent, ...rest }) => {
  const getComponent = props => {
    return userService.isAuthenticated() ? (
      <ProtectedComponent {...props} />
    ) : (
      <Redirect to='/login' />
    );
  };

  return <Route {...rest} render={getComponent} />;
};

export default PrivateRoute;
