import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { TableContainer, Paper } from '@material-ui/core';
import { MdEdit, MdDelete } from 'react-icons/md';
import AppBar from '../../../../components/AppBar';
import { requestCreateFood, requestListFood } from '../../redux/reducers/foodReducer';
import { IRequestCreateFood } from '../../redux/types/IFoodPayloadTypes';
import { addNotification } from '../../../../hooks/toast/redux/reducers/NotificationReducer';
import { WebStore } from '../../../../store/RootReducer';
import Table from '../../../../components/Table';
import {
  Container, MainContainer, useStyles,
} from './styles';

interface FoodProps {
  id: number;
  name: string;
  unity: string;
  calories: number;
}

const AddFood: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const foods = useSelector((state: WebStore) => state.food.food);
  const classes = useStyles();

  const { register, errors, handleSubmit } = useForm();

  // const onSubmit = handleSubmit((data) => {
  //   dispatch(requestCreateFood({ ...data } as IRequestCreateFood));
  // });

  useEffect(() => {
    setLoading(true);
    dispatch(requestListFood({
      callback: (data, error) => {
        setLoading(false);
        if (error) { dispatch(addNotification({ message: 'Erro em carregar alimentos!', options: { variant: 'error' }, key: Math.random() })); }
      },
    }));
  }, []);

  return (
    <Container>
      <AppBar title="Alimentos" />
      <MainContainer>
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
                renderItem: () => (<MdEdit color="purple" size={28} />),
              },
              {
                renderItem: () => (<MdDelete color="red" size={28} />),
              },
            ]}
            selectBox
            actions={[
              {
                renderItem: () => (<MdDelete size={28} />),
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
