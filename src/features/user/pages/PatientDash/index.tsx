import React from 'react';
import { Route, Switch } from 'react-router-dom';
import EatingPlan from './EatingPlan';
import Homepage from './Homepage';
import NewsInfo from './NewsInfo';
import PreScheduling from './PreScheduling';

const PatientDash: React.FC = () => (
  <>
    <Switch>
      <Route exact path="/dashboard" component={Homepage} />
      <Route exact path="/dashboard/newsInfo/:id" component={NewsInfo} />
      <Route exact path="/dashboard/eatingPlan" component={EatingPlan} />
      <Route exact path="/dashboard/preSchedule" component={PreScheduling} />
    </Switch>
  </>
);

export default PatientDash;
