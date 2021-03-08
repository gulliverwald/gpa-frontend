import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  TableContainer, Paper, MenuItem, Grid,
} from '@material-ui/core';
import { MdEdit, MdDelete } from 'react-icons/md';
import AppBar from '../../../../components/AppBar';
import {
  requestCreateFood,
  requestDeleteFood,
  requestListFood,
} from '../../redux/reducers/foodReducer';
import { IRequestCreateFood, IRequestDeleteFood } from '../../redux/types/IFoodPayloadTypes';
import { addNotification } from '../../../../hooks/toast/redux/reducers/NotificationReducer';
import { WebStore } from '../../../../store/RootReducer';
import Table from '../../../../components/Table';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import Button from '../../../../components/Button';
import { Container, MainContainer, useStyles } from './styles';

interface FoodProps {
  id: number;
  name: string;
  unity: string;
  calories: number;
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
  const foods = useSelector((state: WebStore) => state.food.food);
  const classes = useStyles();

  const {
    register, errors, handleSubmit, control,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    dispatch(requestCreateFood({ ...data } as IRequestCreateFood));
  });

  const handleDelete = (id: any) => {
    dispatch(requestDeleteFood({ id } as IRequestDeleteFood));
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
        <form onSubmit={onSubmit} className={classes.formContainer}>
          <h2>Cadastrar um novo Alimento</h2>
          <Grid container spacing={1}>
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
                inputRef={register({ required: 'Campo obrigatório!', valueAsNumber: true })}
                required
                id="calories"
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
        <h2>Lista de Alimentos</h2>
        <TableContainer component={Paper} className={classes.tableContainer}>
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
            rows={foods}
            loading={loading}
            rowActions={[
              {
                renderItem: () => <MdEdit color="purple" size={28} />,
              },
              {
                renderItem: () => <MdDelete color="red" size={28} />,
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
      </MainContainer>
    </Container>
  );
};

export default AddFood;
