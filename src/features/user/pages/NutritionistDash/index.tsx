import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppBar } from '@material-ui/core';
import ListPatient from './ListPatient';
import AddPatient from './AddPatient';
import AddEatingPlan from './AddEatingPlan';
import AddNews from './AddNews';
import NutritionistSidebar from '../../../../components/NutritionistSidebar';
import {
  Container, MainContainer, useStyles,
} from './styles';

const NutritionistDash: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Container>
        <NutritionistSidebar />
        <MainContainer>
          <AppBar
            className={classes.appbar}
          >
            <div className={classes.containerApp}>
              <p><b>Viviane Camila de Carvalho</b></p>
              <p className={classes.crn}>CRN: 12391/05</p>
            </div>
          </AppBar>
          <Switch>
            <Route path="/addPatient" component={AddPatient} />
            <Route path="/addEatingPlan" component={AddEatingPlan} />
            <Route path="/listPatient" component={ListPatient} />
            <Route path="/addNews" component={AddNews} />
          </Switch>
        </MainContainer>
      </Container>
    </>
  );
};

export default NutritionistDash;
