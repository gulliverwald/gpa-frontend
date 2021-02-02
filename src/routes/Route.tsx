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
  isPrivate,
  component: Component,
  // ...rest
} : RouteProps) => {
  const user = useSelector((store: WebStore) => store.user.state.user.role);
  const token = useSelector((store: WebStore) => store.user.state.user.token);

  api.defaults.headers.authorization = `Bearer ${token}`;
  let pathname: string;
  if (user === 'nutritionist') {
    pathname = '/admin';
  } else {
    pathname = '/home';
  }
  return (
    <ReactDOMRoute
      // {...rest}
      render={({ location }) => (isPrivate === !!token ? (
        <Component />
      ) : (
        <Redirect
          to={{
            pathname: isPrivate ? '/login' : pathname,
            state: { from: location },
          }}
        />
      ))}
    />
  );
};

export default Route;
