import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import Route from './Route';
// import Login from '../features/user/pages/Login';
import NutritionistDash from '../features/user/pages/NutritionistDash';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={NutritionistDash} />
    <Route path="/login" exact component={NutritionistDash} />
  </Switch>
);

export default Routes;
