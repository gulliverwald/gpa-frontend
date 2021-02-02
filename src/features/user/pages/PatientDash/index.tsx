import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import EatingPlan from './EatingPlan';
import NewsInfo from './NewsInfo';
import PreScheduling from './PreScheduling';
// import { Container } from './styles';

const PatientDash: React.FC = () => {
  useEffect(() => {}, []);

  return (
    <>
      <Switch>
        <Route exact path="/viewEatingPlan" component={EatingPlan} />
        <Route exact path="/viewNews" component={NewsInfo} />
        <Route exact path="/viewPreScheduling" component={PreScheduling} />
      </Switch>
    </>
  );
};

export default PatientDash;
