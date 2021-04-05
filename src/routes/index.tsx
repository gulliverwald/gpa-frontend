import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../features/session/pages/Login';
import ForgotPassword from '../features/session/pages/ForgotPassword';
import ResetPassword from '../features/session/pages/ResetPassword';
import NutritionistDash from '../features/user/pages/NutritionistDash';
import PatientDash from '../features/user/pages/PatientDash';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/forgot" exact component={ForgotPassword} />
    <Route path="/reset_password/:token" exact component={ResetPassword} />
    <Route path="/dashboard" isPrivate component={PatientDash} />
    <Route path="/admin" isPrivate component={NutritionistDash} />
  </Switch>
);

export default Routes;
