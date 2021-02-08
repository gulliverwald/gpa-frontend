import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../features/user/pages/Login';
import NutritionistDash from '../features/user/pages/NutritionistDash';
import PatientDash from '../features/user/pages/PatientDash';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/dashboard" isPrivate component={PatientDash} />
    <Route path="/admin" isPrivate component={NutritionistDash} />
  </Switch>
);

export default Routes;
