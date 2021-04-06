import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Paper, Accordion, AccordionSummary, AccordionDetails, Typography,
  Table, TableHead, TableRow, TableCell, TableBody, CircularProgress,
} from '@material-ui/core';

import { MdExpandMore } from 'react-icons/md';

import api from '../../../../services/api';

import { WebStore } from '../../../../store/RootReducer';
import PatientAppbar from '../../../../components/PatientAppbar';
import BackdropLoading from '../../../../components/BackdropLoading';

import { Container, BoxContainer, useStyles } from './styles';

interface LastScheduleProps {
  eating_plan_id: number;
    schedule: {
      id: number;
      value: number;
      date: Date;
      patient_id: number;
      appointment_id: number;
      eating_plan_id: number;
      anthropometric_data_id: number;
      observation: string;
    };
    anamnesis: Array<
      {
        id: number;
        description: string;
        type: string;
        dangerousness: string;
      }
    >;
    anthropometric_data: {
      id: number;
      tricipital_skin_fold: number;
      bicipital_skin_fold: number;
      percentage_of_muscle_mass: number;
      waist_circumference: number;
      arm_circumference: number;
      height: number;
      weight: number;
      supra_iliac: number;
      visceral_fat: number;
      suprascapular: number;
      metabolic_age: number;
      bioimpedance: number;
      sum_of_pleats: number
    };
    eatingPlan: {
      id: number;
      guidelines: string;
    };
}

interface EatingPlanProps {
  id: number;
  guidelines: string;
  meal: Array<
    {
      id: number;
      name: string;
      eating_plan_id: number;
      observations: string;
      meal_has_food: Array<
        {
          meal_id: number;
          food_id: number;
          measure: number;
          description: string;
          food: {
            id: number;
            measure: number;
            name: string;
            unity: string;
            calories: number;
            substitutions: Array<
              {
                id: Date;
                food_id: number;
                food_substitution_id: number;
                measure: number;
                description: string;
                substitution: {
                  id: number;
                  measure: number;
                  name: string;
                  unity: string;
                  calories: number;
                }
              }
              >;
            };
        }>;
    }>;
}

const EatingPlan: React.FC = () => {
  const [lastSchedule, setLastSchedule] = useState<LastScheduleProps>();
  const [eatingPlan, setEatingPlan] = useState<EatingPlanProps>();
  const [loading, setLoading] = useState(false);

  const user = useSelector((store: WebStore) => store.user.state.userInfo.user);
  const classes = useStyles();

  const calcIMC = (a: number, b: number) => {
    const res = (a / (b ** 2));
    return res.toFixed(2);
  };

  useEffect(() => {
    setLoading(true);
    api.get(`schedule/patient/last/${user.id}`)
      .then((response) => {
        if (response.data) {
          setLastSchedule(response.data);
          api.get(`/EatingPlan/${response.data.eating_plan_id}`)
            .then((response2) => {
              if (response2.data) {
                setEatingPlan(response2.data);
              }
            })
            .finally(() => {
              setLoading(false);
            });
        }
      })
      .finally(() => {
        setLoading(false);
      });
    console.log(eatingPlan);
  }, []);

  return (
    <>
      <PatientAppbar />
      <Container>
        <BoxContainer>
          {/* <p>PLANO ALIMENTAR</p> */}
          <h1>
            <b>
              Dados Antropométricos:
            </b>
            {' '}
            {user.name}
          </h1>
          {lastSchedule ? (
            <>
              <div className="antropo-data">

                <div>
                  <span>
                    Altura:
                    {' '}
                    {lastSchedule.anthropometric_data.height}
                    {' '}
                    m
                  </span>
                  <span>
                    Peso:
                    {' '}
                    {lastSchedule.anthropometric_data.weight}
                    {' '}
                    kg
                  </span>
                  <span>
                    IMC:
                    {' '}
                    {
                      calcIMC(lastSchedule.anthropometric_data.weight,
                        lastSchedule.anthropometric_data.height)
                    }
                    {' '}
                    kg/m²
                  </span>
                  <span>
                    Gordura visceral:
                    {' '}
                    {lastSchedule.anthropometric_data.visceral_fat}
                  </span>
                  <span>
                    Idade metabólica:
                    {' '}
                    {lastSchedule.anthropometric_data.metabolic_age}
                    {' '}
                    anos
                  </span>
                </div>
                <div>
                  <span>
                    <b>Percentual de Gordura</b>
                    <span>
                      Bioimpedância
                      <br />
                      {lastSchedule.anthropometric_data.bioimpedance}
                    </span>
                    <span>
                      Somatório de Pregas
                      <br />
                      {lastSchedule.anthropometric_data.sum_of_pleats}
                    </span>
                  </span>
                  <span>
                    <b>Percentual de Massa Muscular</b>
                    <span>
                      {lastSchedule.anthropometric_data.percentage_of_muscle_mass}
                      {' '}
                      %
                    </span>
                  </span>
                </div>
                <div>
                  <span>
                    <b>Circunferência do braço</b>
                    <span>
                      {lastSchedule.anthropometric_data.arm_circumference}
                      {' '}
                      mm
                    </span>
                  </span>
                  <span>
                    <b>Circunferência da cintura</b>
                    <span>
                      {lastSchedule.anthropometric_data.waist_circumference}
                      {' '}
                      mm
                    </span>
                  </span>
                </div>
                <div>
                  <span>
                    <b>Prega cutânea</b>
                    <span>
                      Bicipital
                      {' '}
                      {lastSchedule.anthropometric_data.bicipital_skin_fold}
                      {' '}
                    </span>
                    <span>
                      Tricipital
                      {' '}
                      {lastSchedule.anthropometric_data.tricipital_skin_fold}
                      {' '}
                    </span>
                  </span>
                  <span>
                    Supra ilíaca:
                    {' '}
                    {lastSchedule.anthropometric_data.supra_iliac}
                    {' '}
                    mm
                  </span>
                  <span>
                    Supra escapular:
                    {' '}
                    {lastSchedule.anthropometric_data.suprascapular}
                    {' '}
                    mm
                  </span>
                </div>
              </div>
            </>
          ) : <CircularProgress color="primary" size={80} />}
          <Paper elevation={3} className={classes.paper}>
            <h1>Plano Alimentar</h1>

            {eatingPlan ? (eatingPlan.meal.map((meal) => (
              <>
                <div className="line" key={meal.id}>
                  <Accordion className={classes.accordion}>
                    <AccordionSummary
                      expandIcon={<MdExpandMore />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>{meal.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionDetail}>
                      <div className={classes.foodTitle}>
                        <h4><b>Alimento(s)</b></h4>
                      </div>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell><b>Nome</b></TableCell>
                            <TableCell align="left"><b>Medida Caseira</b></TableCell>
                            <TableCell align="left"><b>Substituição</b></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {meal.meal_has_food.map((foodAux) => (
                            <TableRow key={foodAux.meal_id}>
                              <TableCell align="left">
                                `
                                {foodAux.food.name}
                              </TableCell>
                              <TableCell align="left">
                                {foodAux.measure}
                                {' '}
                                {' '}
                                {foodAux.food.unity}
                              </TableCell>
                              <TableCell align="left">
                                {foodAux.food.substitutions.map((substitution) => (
                                  <span>
                                    {` ${substitution.substitution.name} (${substitution.measure * substitution.substitution.measure} ${substitution.substitution.unity}),`}
                                  </span>
                                ))}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <Typography variant="subtitle2" color="textSecondary" style={{ paddingTop: '16px' }}>
                        Observações:
                        {' '}
                        {meal.observations}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </>
            ))
            ) : <CircularProgress color="primary" size={80} />}
          </Paper>
        </BoxContainer>
      </Container>
      <BackdropLoading open={loading} />

    </>
  );
};

export default EatingPlan;
