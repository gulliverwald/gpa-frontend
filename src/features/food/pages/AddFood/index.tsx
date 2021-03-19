import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  TableContainer,
  Paper,
  MenuItem,
  Grid,
  IconButton,
  Modal,
  TextField,
  Card,
  Select as SelectMUI,
} from '@material-ui/core';
import {
  MdEdit, MdDelete, MdSearch, MdAdd, MdRemove,
} from 'react-icons/md';
import AppBar from '../../../../components/AppBar';
import {
  requestCreateFood,
  requestUpdateFood,
  requestDeleteFood,
  requestListFood,
} from '../../redux/reducers/foodReducer';
import {
  IRequestCreateFood,
  IRequestUpdateFood,
} from '../../redux/types/IFoodPayloadTypes';
import { ISubstitutionsInfo } from '../../redux/types/IFoodState';
import { addNotification } from '../../../../hooks/toast/redux/reducers/NotificationReducer';
import { WebStore } from '../../../../store/RootReducer';
import Table from '../../../../components/Table';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import Button from '../../../../components/Button';
import ConfirmModal from '../../../../components/Modal';
import { Container, MainContainer, useStyles } from './styles';
import BackdropLoading from '../../../../components/BackdropLoading';

interface FoodProps {
  id: number;
  name: string;
  unity: string;
  calories: number;
  measure: number;
}

interface SubstitutionsProps {
  id: number;
  name: string;
  measure: number;
  description: string;
}

const unities = [
  'Unidade',
  'Escumadeira Grande',
  'Escumadeira Média',
  'Escumadeira Pequena',
  'Concha Grande',
  'Concha Média',
  'Concha Pequena',
  'Colher de servir',
  'Colher de sopa',
  'Colher sobremesa',
  'Colher de chá',
  'Colher café',
  'Copo americano',
  'Copo duplo',
];

const AddFood: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [substitutions, setSubstitutions] = useState<SubstitutionsProps[]>([]);

  const [toDeleteFood, setToDeleteFood] = useState<FoodProps>();
  const [toUpdateFood, setToUpdateFood] = useState<FoodProps>();

  const [searchBar, setSearchBar] = useState('');

  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const [foodSub, setFoodSub] = useState<FoodProps>();

  const foods = useSelector((state: WebStore) => state.food.food);
  const classes = useStyles();

  const {
    register, errors, handleSubmit, control,
  } = useForm();

  const {
    register: register2,
    errors: errors2,
    handleSubmit: handleSubmit2,
    control: control2,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    dispatch(requestCreateFood({ ...data } as IRequestCreateFood));
  });

  const handleSubstitutions = handleSubmit2((data) => {
    console.log(data);
    const name = foods.find((food) => food.id === data.id)?.name;
    if (name) {
      setSubstitutions((old) => [
        {
          id: data.id,
          name,
          measure: parseInt(data.measure, 10),
          description: data.description,
        },
        ...old,
      ]);
    }
  });

  const handleUpdate = handleSubmit((data) => {
    if (toUpdateFood) {
      dispatch(
        requestUpdateFood({
          id: toUpdateFood.id,
          ...data,
          substitutions: substitutions as ISubstitutionsInfo[],
        } as IRequestUpdateFood),
      );
    }
  });

  const handleDelete = () => {
    if (toDeleteFood) {
      setLoading(true);
      dispatch(
        requestDeleteFood({
          id: toDeleteFood.id,
          callback: (data, error) => {
            setLoading(false);
            if (error) {
              dispatch(
                addNotification({
                  message: error,
                  options: { variant: 'error' },
                  key: Math.random(),
                }),
              );
            }
            if (data) {
              dispatch(
                addNotification({
                  message: 'Alimento deletado!',
                  options: { variant: 'success' },
                  key: Math.random(),
                }),
              );
            }
          },
        }),
      );
    }
  };

  useEffect(() => {
    setLoading(true);
    dispatch(
      requestListFood({
        callback: (data, error) => {
          setLoading(false);
          if (error) {
            dispatch(
              addNotification({
                message: 'Erro em carregar alimentos!',
                options: { variant: 'error' },
                key: Math.random(),
              }),
            );
          }
        },
      }),
    );
  }, []);

  return (
    <Container>
      <AppBar title="Alimentos" />
      <MainContainer>
        <Grid container spacing={2} alignItems="center" justify="center">
          <form onSubmit={onSubmit} className={classes.formContainer}>
            <h2>Cadastrar um novo Alimento</h2>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={6}>
                <Input
                  inputRef={register({ required: 'Campo obrigatório!' })}
                  required
                  id="name"
                  name="name"
                  label="Nome"
                  autoComplete="off"
                  className={classes.inputForm}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  inputRef={register({
                    required: 'Campo obrigatório!',
                    valueAsNumber: true,
                  })}
                  required
                  id="calories"
                  type="number"
                  name="calories"
                  label="Calorias"
                  autoComplete="off"
                  className={classes.inputForm}
                  helperText="Quantidade calórica do alimento (em Kcal)"
                />
              </Grid>
              <Grid item xs={3}>
                <Input
                  inputRef={register({ required: false, valueAsNumber: true })}
                  type="number"
                  id="measure"
                  name="measure"
                  label="Quantidade"
                  autoComplete="off"
                  className={classes.inputForm}
                />
              </Grid>
              <Grid item xs={9}>
                <Select
                  id="unity"
                  name="unity"
                  label="Medida Caseira"
                  control={control}
                  defaultValue="Unidade"
                  required
                >
                  {unities.map((unity) => (
                    <MenuItem key={unity} value={unity}>
                      {unity}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.buttonForm}
                >
                  Salvar
                </Button>
              </Grid>
            </Grid>
          </form>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <h2>Lista de Alimentos</h2>
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                onChange={(event) => {
                  setSearchBar(event.currentTarget.value);
                }}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <IconButton type="submit">
                      <MdSearch />
                    </IconButton>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TableContainer
                component={Paper}
                className={classes.tableContainer}
              >
                <Table<FoodProps>
                  columns={[
                    {
                      title: 'Alimento',
                      type: 'string',
                      props: ['name'],
                      orderable: true,
                    },
                    {
                      title: 'Caloria (kcal)',
                      type: 'number',
                      props: ['calories'],
                      orderable: true,
                    },
                    {
                      title: 'Medida',
                      type: 'string',
                      props: ['unity'],
                      orderable: true,
                    },
                  ]}
                  rows={foods.filter((food) => food.name.includes(searchBar))}
                  loading={loading}
                  rowActions={[
                    {
                      renderItem: (food) => (
                        <IconButton
                          aria-label="update"
                          onClick={() => {
                            setToUpdateFood(food);
                            setOpenUpdate(true);
                          }}
                        >
                          <MdEdit color="purple" />
                        </IconButton>
                      ),
                    },
                    {
                      renderItem: (food) => (
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            setToDeleteFood(food);
                            setOpenDelete(true);
                          }}
                        >
                          <MdDelete color="red" />
                        </IconButton>
                      ),
                    },
                  ]}
                  selectBox
                  actions={[
                    {
                      renderItem: () => <MdDelete size={28} />,
                    },
                  ]}
                  defaultOrderBy="name"
                />
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </MainContainer>
      <ConfirmModal
        message="Tem certeza que deseja excluir este alimento?"
        open={openDelete}
        handleConfirm={() => {
          handleDelete();
          setOpenDelete(false);
        }}
        handleCancel={() => {
          setOpenDelete(false);
          setToDeleteFood(undefined);
        }}
      />
      <Modal
        open={openUpdate}
        onClose={() => {
          setOpenUpdate(false);
          setToUpdateFood(undefined);
        }}
        className={classes.modalContainer}
      >
        <Card className={classes.modalCard}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12}>
              <form onSubmit={handleUpdate} key={1} id="update">
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={6}>
                    <Input
                      fullWidth
                      defaultValue={toUpdateFood?.name}
                      id="name"
                      name="name"
                      label="Nome"
                      inputRef={register({ required: false })}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Input
                      fullWidth
                      type="number"
                      defaultValue={toUpdateFood?.calories}
                      id="calories"
                      name="calories"
                      label="Calorias"
                      inputRef={register({
                        required: false,
                        valueAsNumber: true,
                      })}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Input
                      fullWidth
                      type="number"
                      defaultValue={toUpdateFood?.measure}
                      id="measure"
                      name="measure"
                      label="Quantidade"
                      inputRef={register({
                        required: false,
                        valueAsNumber: true,
                      })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      id="unity"
                      name="unity"
                      label="Medida Caseira"
                      control={control}
                      defaultValue={toUpdateFood?.unity}
                    >
                      {unities.map((unity) => (
                        <MenuItem key={unity} value={unity}>
                          {unity}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={12}>
              <span>
                <b>Adicionar substituição</b>
              </span>
              <form
                id="substitutions"
                name="substitions"
                onSubmit={handleSubstitutions}
                key={2}
              >
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={4}>
                    <Controller
                      as={(
                        <SelectMUI
                          label="Alimento Substituto"
                          variant="outlined"
                          fullWidth
                        >
                          {foods.map((food) => (
                            <MenuItem key={food.id} value={food.id}>
                              {food.name}
                            </MenuItem>
                          ))}
                        </SelectMUI>
                      )}
                      id="id"
                      name="id"
                      control={control2}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Input
                      id="measure"
                      type="number"
                      name="measure"
                      label="Quantidade"
                      inputRef={register2({
                        required: false,
                        valueAsNumber: true,
                      })}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Input
                      id="description"
                      name="description"
                      label="Descrição"
                      inputRef={register2({ required: false })}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton type="submit" form="substitutions">
                      <MdAdd color="green" size={32} />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12}>
                    {substitutions.map((substitution) => (
                      <>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <p key={substitution.id}>
                            <b>Substituição:</b>
                            {' '}
                            {substitution.name}
                            ,
                            {' '}
                            <b>Unidade:</b>
                            {' '}
                            {substitution.measure}
                            ,
                            {' '}
                            <b>Descrição:</b>
                            {' '}
                            {substitution.description}
                          </p>
                          <IconButton
                            onClick={() => setSubstitutions(substitutions.filter(
                              (sub) => sub.id !== substitution.id,
                            ))}
                          >
                            <MdRemove color="red" size={32} />
                          </IconButton>
                        </div>
                      </>
                    ))}
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <div className={classes.buttonCardContainer}>
              <Button
                variant="contained"
                color="default"
                className={classes.button}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                form="update"
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Confirmar
              </Button>
            </div>
          </Grid>
        </Card>
      </Modal>
      <BackdropLoading open={loading} />
    </Container>
  );
};

export default AddFood;
