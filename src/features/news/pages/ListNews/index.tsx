import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { requestListNews } from '../../redux/reducers/newsReducer';
import { addNotification } from '../../../../hooks/toast/redux/reducers/NotificationReducer';
import { WebStore } from '../../../../store/RootReducer';
import AppBar from '../../../../components/AppBar';
import { Container, useStyles } from './styles';

interface NewsProps {
  id: number;
  title: string;
  subtitle?: string;
  date: string;
}

const ListNews: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const news = useSelector((state: WebStore) => state.news.news);

  const classes = useStyles();

  // useEffect(() => {
  //   setLoading(true);
  //   dispatch(
  //     requestListNews({
  //       callback: (data, error) => {
  //         setLoading(false);
  //         if (error) {
  //           dispatch(
  //             addNotification({
  //               message: 'Erro em carregar alimentos!',
  //               options: { variant: 'error' },
  //               key: Math.random(),
  //             }),
  //           );
  //         }
  //       },
  //     }),
  //   );
  // }, []);

  return (
    <>
      <Container>
        <AppBar title="Adicionar Notícia / Dica do Dia" />
        <Grid container spacing={2} />
      </Container>
    </>
  );
};

export default ListNews;
