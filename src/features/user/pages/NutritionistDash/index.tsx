import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppBar } from '@material-ui/core';
import ListPatient from '../../../patient/pages/ListPatient';
import AddPatient from '../../../patient/pages/AddPatient';
import AddEatingPlan from '../../../eatingPlan/pages/AddEatingPlan';
import AddNews from '../../../news/pages/AddNews';
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
            <Route exact path="/admin/addPatient" component={AddPatient} />
            <Route exact path="/admin/addEatingPlan" component={AddEatingPlan} />
            <Route exact path="/admin/listPatient" component={ListPatient} />
            <Route exact path="/admin/addNews" component={AddNews} />
          </Switch>
        </MainContainer>
      </Container>
    </>
  );
};

export default NutritionistDash;
