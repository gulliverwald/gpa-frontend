import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppBar } from '@material-ui/core';
import ListPatient from '../../../patient/pages/ListPatient';
import AddPatient from '../../../patient/pages/AddPatient';
import AddNews from '../../../news/pages/AddNews';
import ListNews from '../../../news/pages/ListNews';
import UpdateNews from '../../../news/pages/UpdateNews';

import NutritionistSidebar from '../../../../components/NutritionistSidebar';
import {
  Container, MainContainer, useStyles,
} from './styles';
import AddFood from '../../../food/pages/AddFood';
import NewsInfoNutri from '../../../news/pages/NewsInfoNutri';
import AddSchedule from '../../../schedule/pages/AddSchedule';
import AddEatingPlan from '../../../eatingPlan/pages/AddEatingPlan';

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
            <Route exact path="/admin/listPatient" component={ListPatient} />
            <Route exact path="/admin/addFood" component={AddFood} />
            <Route exact path="/admin/addNews" component={AddNews} />
            <Route exact path="/admin/updateNews/:id" component={UpdateNews} />
            <Route exact path="/admin/listNews" component={ListNews} />
            <Route exact path="/admin/listNews/:id" component={NewsInfoNutri} />
            <Route exact path="/admin/addSchedule" component={AddSchedule} />
            <Route exact path="/admin/addEatingPlan" component={AddEatingPlan} />
          </Switch>
        </MainContainer>
      </Container>
    </>
  );
};

export default NutritionistDash;
