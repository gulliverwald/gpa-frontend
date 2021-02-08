/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import { useSelector } from 'react-redux';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';
import { WebStore } from '../store/RootReducer';

import api from '../services/api';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const user = useSelector((store: WebStore) => store.user.state.userInfo.role);
  const token = useSelector((store: WebStore) => store.user.state.userInfo.token);

  api.defaults.headers.authorization = `Bearer ${token}`;
  let pathname: string;

  if (user === 'nutritionist') {
    pathname = '/admin';
  } else {
    pathname = '/dashboard';
  }

  return (
    <ReactDOMRoute
      {...rest}
      // render={({ location }) => (isPrivate === !!token ? (
      render={() => (isPrivate === !!token ? (
        <Component />
      ) : (
        <Redirect
          to={{
            pathname: isPrivate ? '/' : pathname,
            // state: { from: location },
          }}
        />
      ))}
    />
  );
};

export default Route;
