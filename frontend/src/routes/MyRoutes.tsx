import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAuth } from '../contexts/Authentication';

interface MyRouteProps extends RouteProps {
  component: React.ComponentType;
}

export const AuthRoute: React.FC<MyRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <Route {...rest} render={({ location }) => {
      return user
        ? <Component />
        : <Redirect to={{
            pathname: '/',
            state: { from: location }
          }} />
    }} />
  );
};

export const AdminRoute: React.FC<MyRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <Route {...rest} render={({ location }) => {
      return user && user.user_type === 'admin'
        ? <Component />
        : <Redirect to={{
            pathname: '/',
            state: { from: location }
          }} />
    }} />
  );
};

