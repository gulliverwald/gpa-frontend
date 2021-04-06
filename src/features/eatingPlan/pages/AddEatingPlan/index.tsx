/* eslint-disable no-undef */
import React, { useState, useEffect, useCallback } from 'react';
import { useForm, useWatch, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  Modal,
  Grid,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
import {
  MdEdit, MdDelete, MdAdd, MdExpandMore,
} from 'react-icons/md';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import AppBar from '../../../../components/AppBar';
import ConfirmModal from '../../../../components/Modal';
import BackdropLoading from '../../../../components/BackdropLoading';
import api from '../../../../services/api';
import { addNotification } from '../../../../hooks/toast/redux/reducers/NotificationReducer';
import { WebStore } from '../../../../store/RootReducer';

import { Container, useStyles } from './styles';

interface MealProps {
  id: number;
  name: string;
  eating_plan_id: number;
  observations: string;
  meal_has_food: [
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
        substitutions: [
          {
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
        ];
      };
    }
  ];
}

interface PatientProps {
  id: number;
  name: string;
}

interface FoodProps {
  meal_id: number;
  id: number;
  name: string;
  unity: string;
  calories: number;
  measure: number;
}

interface DeleteFoodProps {
  meal_id: number;
  food_id: number;
  measure: number;
  description: string;
}

function IsolateReRender({
  control,
  food,
}: {
  control: any;
  food: any;
}): JSX.Element {
  const measure: number | undefined = useWatch({
    control,
    name: 'measure',
  });

  if (food && measure) {
    return (
      <span>
        x
        {` ${food?.measure} ${food?.unity} = ${
          (food?.calories || 1) * measure
        } Kcal`}
      </span>
    );
  }
  return <span />;
}

const AddEatingPlan: React.FC = () => {
  const { patientId, id } = useParams<{ patientId: string; id: string }>();
  const dispatch = useDispatch();

  const [patient, setPatient] = useState<PatientProps>();
  const [eatingPlanGuidelines, setEatingPlanGuidelines] = useState('');

  const [openModalMeal, setOpenModalMeal] = useState(false);
  const [openDeleteMeal, setOpenDeleteMeal] = useState(false);
  const [toCreateMeal, setToCreateMeal] = useState<MealProps>();
  const [toDeleteMeal, setToDeleteMeal] = useState<MealProps>();
  const [indexToUpdate, setIndexToUpdate] = useState(-1);
  const [meals, setMeals] = useState<MealProps[]>([]);

  const [openModalFood, setOpenModalFood] = useState(false);
  const [openDeleteFood, setOpenDeleteFood] = useState(false);
  const [toAddFood, setToAddFood] = useState(-1);
  const [toDeleteFood, setToDeleteFood] = useState<DeleteFoodProps>();
  const [foodId, setFoodId] = useState('');
  const [foods, setFoods] = useState<FoodProps[]>([]);

  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const { register, errors, handleSubmit } = useForm();

  const {
    register: register2,
    errors: errors2,
    handleSubmit: handleSubmit2,
  } = useForm();

  const {
    register: register3,
    errors: errors3,
    handleSubmit: handleSubmit3,
    getValues: getValues3,
    watch: watch3,
    control: control3,
  } = useForm();

  const {
    register: register4,
    errors: errors4,
    handleSubmit: handleSubmit4,
  } = useForm();

  const onSubmitCreateMeal = handleSubmit((data) => {
    setOpenModalMeal(false);
    async function submitMeal(): Promise<void> {
      setLoading(true);
      try {
        const response = await api.post('/Meal', {
          ...data,
          eating_plan_id: parseInt(id, 10),
        });
        if (response.data.status !== 'error') {
          setMeals([
            ...meals,
            {
              ...response.data,
            },
          ]);
          dispatch(
            addNotification({
              message: 'Refeição adicionada!',
              options: { variant: 'success' },
              key: Math.random(),
            }),
          );
        } else {
          dispatch(
            addNotification({
              message: 'Erro ao criar refeição!',
              options: { variant: 'error' },
              key: Math.random(),
            }),
          );
        }
      } catch (erro) {
        dispatch(
          addNotification({
            message: 'Erro ao criar refeição!',
            options: { variant: 'error' },
            key: Math.random(),
          }),
        );
      } finally {
        setLoading(false);
      }
    }
    submitMeal();
  });

  const onSubmitUpdateMeal = (data: any) => {
    console.log(data);
    async function submitMeal(): Promise<void> {
      setLoading(true);
      try {
        const response = await api.put('/Meal', {
          name: data.name[indexToUpdate],
          observations: data.observations[indexToUpdate],
          eating_plan_id: parseInt(id, 10),
          id: meals[indexToUpdate].id,
        });
        if (response.data.status !== 'error') {
          const index = meals.findIndex((meal) => meal.id === response.data.id);
          meals[index] = response.data;
          setMeals(meals);
          dispatch(
            addNotification({
              message: 'Refeição editada!',
              options: { variant: 'success' },
              key: Math.random(),
            }),
          );
        } else {
          dispatch(
            addNotification({
              message: 'Erro ao editar refeição!',
              options: { variant: 'error' },
              key: Math.random(),
            }),
          );
        }
      } catch (erro) {
        dispatch(
          addNotification({
            message: 'Erro ao editar refeição!',
            options: { variant: 'error' },
            key: Math.random(),
          }),
        );
      } finally {
        setLoading(false);
      }
    }
    submitMeal();
  };

  const handleDeleteMeal = () => {
    async function deleteMeal(): Promise<void> {
      if (toDeleteMeal) {
        setLoading(true);
        try {
          const response = await api.delete(`/Meal/${toDeleteMeal.id}`);
          if (response.data.status !== 'error') {
            setMeals(meals.filter((meal) => meal.id !== toDeleteMeal.id));
            dispatch(
              addNotification({
                message: 'Refeição deletada!',
                options: { variant: 'success' },
                key: Math.random(),
              }),
            );
          } else {
            dispatch(
              addNotification({
                message: 'Erro ao deletar refeição!',
                options: { variant: 'error' },
                key: Math.random(),
              }),
            );
          }
        } catch (erro) {
          dispatch(
            addNotification({
              message: 'Erro ao deletar refeição!',
              options: { variant: 'error' },
              key: Math.random(),
            }),
          );
        } finally {
          setLoading(false);
        }
      }
    }
    deleteMeal();
  };

  const onSubmitAddFood = handleSubmit3((data) => {
    setOpenModalFood(false);
    console.log(data);
    async function addFood(): Promise<void> {
      if (toAddFood) {
        setLoading(true);
        try {
          const response = await api.post('/Meal/addFood', {
            ...data,
            meal_id: toAddFood,
            food_id: data.food_id,
          });
          console.log(response.data);
          if (response.data.meal_id) {
            const aux = meals.findIndex((item) => item.id === toAddFood);
            meals[aux].meal_has_food.unshift(response.data);
            dispatch(
              addNotification({
                message: 'Alimento adicionado à refeição!',
                options: { variant: 'success' },
                key: Math.random(),
              }),
            );
          } else {
            dispatch(
              addNotification({
                message: 'Erro ao adicionar o alimento!',
                options: { variant: 'error' },
                key: Math.random(),
              }),
            );
          }
        } catch (erro) {
          console.log(erro);
          dispatch(
            addNotification({
              message: 'Erro ao adicionar o alimento!',
              options: { variant: 'error' },
              key: Math.random(),
            }),
          );
        } finally {
          setLoading(false);
        }
      }
    }
    addFood();
  });

  const handleDeleteFood = () => {
    async function deleteFood(): Promise<void> {
      if (toDeleteFood) {
        setLoading(true);
        try {
          const response = await api.delete(
            `/meal/removeFood/${toDeleteFood.meal_id}/${toDeleteFood.food_id}`,
          );
          if (response.data.status !== 'error') {
            const aux = meals.findIndex(
              (item) => item.id === toDeleteFood.meal_id,
            );
            const aux2 = meals[aux].meal_has_food.findIndex(
              (item) => item.food_id === toDeleteFood.food_id,
            );
            meals[aux].meal_has_food.splice(aux2, 1);
            setMeals(meals);
            dispatch(
              addNotification({
                message: 'Alimento deletado!',
                options: { variant: 'success' },
                key: Math.random(),
              }),
            );
          } else {
            dispatch(
              addNotification({
                message: 'Erro ao deletar alimento!',
                options: { variant: 'error' },
                key: Math.random(),
              }),
            );
          }
        } catch (erro) {
          dispatch(
            addNotification({
              message: 'Erro ao deletar alimento!',
              options: { variant: 'error' },
              key: Math.random(),
            }),
          );
        } finally {
          setLoading(false);
        }
      }
    }
    deleteFood();
  };

  const handleSubmitGuidelines = handleSubmit4((data: any) => {
    setLoading(true);
    async function submitGuidelines(): Promise<void> {
      if (eatingPlanGuidelines) {
        try {
          const response = await api.put('/EatingPlan', {
            id: parseInt(id, 10),
            guidelines: data.guidelines,
          });
          if (!response.data.status) {
            console.log(response.data);
            setEatingPlanGuidelines(response.data.guidelines);
            dispatch(
              addNotification({
                message: 'Orientações modificadas!',
                options: { variant: 'success' },
                key: Math.random(),
              }),
            );
          } else {
            dispatch(
              addNotification({
                message: 'Erro ao modificar orientações!',
                options: { variant: 'error' },
                key: Math.random(),
              }),
            );
          }
        } catch (erro) {
          dispatch(
            addNotification({
              message: 'Erro ao modificar orientações!',
              options: { variant: 'error' },
              key: Math.random(),
            }),
          );
        } finally {
          setLoading(false);
        }
      }
    }
    submitGuidelines();
  });

  useEffect(() => {
    setLoading(true);
    if (id !== undefined) {
      api
        .get(`/Users/${patientId}`)
        .then((response) => {
          if (response.data.id) {
            setPatient(response.data);
          }
        })
        .finally(() => {
          setLoading(false);
        });
      api
        .get(`/EatingPlan/${id}`)
        .then((response) => {
          if (response.data.id) {
            setMeals(response.data.meal);
            setEatingPlanGuidelines(response.data.guidelines);
          }
        })
        .finally(() => {
          setLoading(false);
        });
      api
        .get('/Food')
        .then((response) => {
          if (response.data) {
            setFoods(response.data);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <AppBar title={`Plano Alimentar > Paciente: ${patient?.name} `} />
      <Container>
        <h2>
          Paciente:
          {' '}
          {patient?.name}
          {' '}
        </h2>

        <Paper elevation={3} className={classes.paper}>
          <h1>Plano Alimentar</h1>
          <p className="guidelines">{eatingPlanGuidelines}</p>
          <form onSubmit={handleSubmitGuidelines} key={4} id="guidelines-form">
            <Input
              fullWidth
              defaultValue={`${eatingPlanGuidelines}`}
              id="guidelines"
              name="guidelines"
              label="Orientações"
              inputRef={register4({
                required: false,
              })}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button type="submit" form="guidelines-form">
              Salvar
            </Button>
          </form>
          <form
            onSubmit={handleSubmit2((data) => onSubmitUpdateMeal(data))}
            key={2}
          >
            {meals
              ? meals.map((meal, index) => {
                const sumCal = meal.meal_has_food
                  ?.reduce((total, item) => total + item.measure * item.food.calories, 0);
                return (
                  <div className="line">
                    <Accordion className={classes.accordion} key={meal.id}>
                      <AccordionSummary
                        expandIcon={<MdExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading} key={sumCal}>
                          {meal.name}
                          {' '}
                          -
                          {' '}
                          {sumCal}
                          {' '}
                          Kcal
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails className={classes.accordionDetail}>
                        <div className={classes.foodTitle}>
                          <h2>
                            <b>Alimento(s)</b>
                          </h2>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              setToAddFood(meal.id);
                              setOpenModalFood(true);
                            }}
                          >
                            Adicionar Alimento
                          </Button>
                        </div>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                <b>Nome</b>
                              </TableCell>
                              <TableCell align="left">
                                <b>Medida Caseira</b>
                              </TableCell>
                              <TableCell align="left">
                                <b>Substituição</b>
                              </TableCell>
                              <TableCell align="left">
                                <b>Calorias (Kcal)</b>
                              </TableCell>
                              <TableCell align="center" />
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {meal.meal_has_food?.map((item) => (
                              <TableRow key={item.food_id}>
                                <TableCell align="left">
                                  {item.food.name}
                                </TableCell>
                                <TableCell align="left">
                                  {item.measure}
                                  {' '}
                                  {item.food.unity}
                                </TableCell>
                                <TableCell align="left">
                                  {item.food.substitutions.map((substitution) => (
                                    <span>
                                      {` ${substitution.substitution.name} (${substitution.measure * substitution.substitution.measure} ${substitution.substitution.unity}),`}
                                    </span>
                                  ))}
                                </TableCell>
                                <TableCell align="left">
                                  {item.measure * item.food.calories}
                                </TableCell>
                                <TableCell align="center">
                                  <IconButton
                                    aria-label="delete"
                                    onClick={() => {
                                      const { food, ...rest } = item;
                                      setToDeleteFood(rest);
                                      setOpenDeleteFood(true);
                                    }}
                                  >
                                    <MdDelete size={30} color="red" />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <Input
                          defaultValue=""
                          inputRef={register2({ required: false })}
                          id="observations"
                          name={`observations[${index}]`}
                          label="Observação"
                          variant="outlined"
                          autoComplete="off"
                          rows={3}
                          multiline
                          InputLabelProps={{
                            shrink: true,
                          }}
                          className={classes.input}
                        />
                        <Input
                          defaultValue={meal.name}
                          inputRef={register2({ required: true })}
                          required
                          id="name"
                          name={`name[${index}]`}
                          label="Nome da Refeição"
                          variant="outlined"
                          autoComplete="off"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          className={classes.input}
                          helperText="Caso queira editá-la, digite o novo nome acima."
                        />
                        <Button
                          type="submit"
                          onClick={() => setIndexToUpdate(index)}
                        >
                          Salvar
                        </Button>
                      </AccordionDetails>
                    </Accordion>

                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        setToDeleteMeal(meal);
                        setOpenDeleteMeal(true);
                      }}
                    >
                      <MdDelete size={30} color="red" />
                    </IconButton>
                  </div>
                );
              })
              : ''}
          </form>

          <div className="new-meal">
            <button type="button" onClick={() => setOpenModalMeal(true)}>
              <MdAdd size={30} color="black" />
              <span>Adicionar nova refeição</span>
            </button>
          </div>
        </Paper>
      </Container>

      <ConfirmModal
        message="Tem certeza que deseja excluir esta refeição?"
        open={openDeleteMeal}
        handleConfirm={() => {
          handleDeleteMeal();
          setOpenDeleteMeal(false);
        }}
        handleCancel={() => {
          setToDeleteMeal(undefined);
          setOpenDeleteMeal(false);
        }}
      />

      <ConfirmModal
        message="Tem certeza que deseja excluir este alimento da refeição?"
        open={openDeleteFood}
        handleConfirm={() => {
          handleDeleteFood();
          setOpenDeleteFood(false);
        }}
        handleCancel={() => {
          setToDeleteFood(undefined);
          setOpenDeleteFood(false);
        }}
      />

      <Modal
        open={openModalFood}
        onClose={() => {
          setOpenModalFood(false);
          setToAddFood(-1);
        }}
        className={classes.modalContainer}
      >
        <Card className={classes.modalCard}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h2>Adicionar alimento na refeição</h2>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={onSubmitAddFood} key={3} id="add-food">
                <Grid
                  container
                  spacing={3}
                  alignItems="center"
                  justify="center"
                >
                  <Grid item xs={12}>
                    <InputLabel shrink> Alimento </InputLabel>
                    <Controller
                      as={(
                        <Select
                          variant="outlined"
                          fullWidth
                          // id="food_id"
                          name="food_id_select"
                          // value={foodId}
                          // onChange={(e) => setFoodId(`${e.target.value}`)}
                          displayEmpty
                          // inputRef={register3({
                          //   required: true,
                          // })}
                        >
                          {foods
                        && foods.map((food) => (
                          <MenuItem key={food.id} value={food.id}>
                            {food.name}
                          </MenuItem>
                        ))}
                        </Select>
                    )}
                      name="food_id"
                      id="food_id"
                      control={control3}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Input
                      fullWidth
                      type="number"
                      id="measure"
                      name="measure"
                      label="Medida"
                      inputProps={{
                        min: 1,
                      }}
                      inputRef={register3({
                        required: false,
                        valueAsNumber: true,
                        min: 1,
                      })}
                      className={classes.inputFormBody}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={9}
                    alignItems="center"
                    alignContent="center"
                    justify="center"
                  >
                    <IsolateReRender
                      control={control3}
                      food={foods.find(
                        (item: any) => item.id === getValues3('food_id'),
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      fullWidth
                      multiline
                      rows={2}
                      id="description"
                      name="description"
                      label="Descrição"
                      inputRef={register3({ required: false })}
                      className={classes.inputFormBody}
                    />
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
          <div className={classes.buttonCardContainer}>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              onClick={() => {
                setOpenModalFood(false);
                setToAddFood(-1);
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              form="add-food"
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Confirmar
            </Button>
          </div>
        </Card>
      </Modal>

      <Modal
        open={openModalMeal}
        onClose={() => {
          setOpenModalMeal(false);
          setToCreateMeal(undefined);
        }}
        className={classes.modalContainer}
      >
        <Card className={classes.modalCard}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h2>Adicionar nova refeição</h2>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={onSubmitCreateMeal} key={1} id="create-meal">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Input
                      fullWidth
                      id="name"
                      name="name"
                      label="Nome"
                      inputRef={register({ required: true })}
                      className={classes.inputForm}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      fullWidth
                      multiline
                      rows={2}
                      id="observations"
                      name="observations"
                      label="Observações"
                      inputRef={register({ required: false })}
                      className={classes.inputFormBody}
                    />
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
          <div className={classes.buttonCardContainer}>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              onClick={() => {
                setOpenModalMeal(false);
                setToCreateMeal(undefined);
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              form="create-meal"
              variant="contained"
              color="secondary"
              className={classes.button}
              // onClick={() => {
              //   setOpenModalMeal(false);
              // }}
            >
              Confirmar
            </Button>
          </div>
        </Card>
      </Modal>

      <BackdropLoading open={loading} />
    </>
  );
};

export default AddEatingPlan;
