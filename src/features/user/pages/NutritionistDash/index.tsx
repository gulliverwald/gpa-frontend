import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppBar } from '@material-ui/core';
import ListPatient from '../../../patient/pages/ListPatient';
import AddPatient from '../../../patient/pages/AddPatient';
import EditPatient from '../../../patient/pages/EditPatient';
// import AddEatingPlan from '../../../eatingPlan/pages/AddEatingPlan';
import AddNews from '../../../news/pages/AddNews';
import ListNews from '../../../news/pages/ListNews';
import UpdateNews from '../../../news/pages/UpdateNews';
import ListSchedules from '../../../schedule/pages/ListSchedules';
import NutritionistSidebar from '../../../../components/NutritionistSidebar';
import {
  Container, MainContainer, useStyles,
} from './styles';
import AddFood from '../../../food/pages/AddFood';
import NewsInfoNutri from '../../../news/pages/NewsInfoNutri';
import AddSchedule from '../../../schedule/pages/AddSchedule';
import ViewSchedule from '../../../schedule/pages/ViewSchedule';
import UpdateSchedule from '../../../schedule/pages/UpdateSchedule';

import AddEatingPlan from '../../../eatingPlan/pages/AddEatingPlan';
import Homepage from './Homepage';

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
            <Route exact path="/admin" component={Homepage} />
            <Route exact path="/admin/addPatient" component={AddPatient} />
            <Route exact path="/admin/editPatient/:id" component={EditPatient} />
            <Route exact path="/admin/listSchedules/:id" component={ListSchedules} />
            {/* <Route exact path="/admin/addEatingPlan" component={AddEatingPlan} /> */}
            <Route exact path="/admin/listPatient" component={ListPatient} />
            <Route exact path="/admin/addFood" component={AddFood} />
            <Route exact path="/admin/addNews" component={AddNews} />
            <Route exact path="/admin/updateNews/:id" component={UpdateNews} />
            <Route exact path="/admin/listNews" component={ListNews} />
            <Route exact path="/admin/listNews/:id" component={NewsInfoNutri} />
            <Route exact path="/admin/listSchedules/:id/addSchedule" component={AddSchedule} />
            <Route exact path="/admin/viewSchedule/:id" component={ViewSchedule} />
            <Route exact path="/admin/patient/:patientId/addEatingPlan/:id" component={AddEatingPlan} />
            <Route exact path="/admin/updateSchedule/:patientId/:id" component={UpdateSchedule} />
          </Switch>
        </MainContainer>
      </Container>
    </>
  );
};

export default NutritionistDash;
