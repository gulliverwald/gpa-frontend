import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  Grid, Paper, Card, CardActions, CardContent, CardMedia, Typography, IconButton,
} from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MdDelete, MdEdit } from 'react-icons/md';

import { requestListNews, requestDeleteNews } from '../../redux/reducers/newsReducer';
import { addNotification } from '../../../../hooks/toast/redux/reducers/NotificationReducer';
import { WebStore } from '../../../../store/RootReducer';

import AppBar from '../../../../components/AppBar';
import ConfirmModal from '../../../../components/Modal';
import BackdropLoading from '../../../../components/BackdropLoading';

import { Container, SearchContainer, useStyles } from './styles';

interface NewsProps {
  id: number;
  title: string;
  link?: string;
  description: string;
  date: string;
  nutritionist_id: number;
  image_link: string;
  subtitle?: string;
}

const ListNews: React.FC = () => {
  const [selectedDate, handleDateChange] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState(false);

  const [toDeleteNews, setToDeleteNews] = useState<NewsProps>();
  const [openDelete, setOpenDelete] = useState(false);

  const dispatch = useDispatch();
  const news = useSelector((state: WebStore) => state.news.news);

  const classes = useStyles();

  const handleDate = (aux: string) => {
    const a = new Date(aux);
    const aDateOnly = new Date(a.valueOf() + a.getTimezoneOffset() * 60 * 1000);
    return `${format(aDateOnly, 'dd/MM/yyyy')}`;
  };

  const handleDelete = () => {
    if (toDeleteNews) {
      setLoading(true);
      dispatch(
        requestDeleteNews({
          id: toDeleteNews.id,
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
                  message: 'Notícia deletada!',
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
      requestListNews({
        callback: (data, error) => {
          setLoading(false);
          if (error) {
            dispatch(
              addNotification({
                message: 'Erro em carregar notícias!',
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
    <>
      <AppBar title="Lista de notícias" />
      <SearchContainer>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            variant="inline"
            openTo="year"
            views={['year', 'month']}
            label="Filtro Data"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </MuiPickersUtilsProvider>
      </SearchContainer>
      <Container>
        <Grid container spacing={2} className={classes.gridContainer}>
          {news.map((map) => (
            <Grid item xs={4} key={map.id}>
              <Paper elevation={3} className={classes.paper}>
                <Card>
                  <CardContent className={classes.cardContent}>
                    <CardMedia image={map.image_link} title={map.title} className={classes.media} />
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.dateContainer}>{handleDate(map.date)}</Typography>
                    <Typography gutterBottom variant="h5" component="h2">{map.title}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">{map.subtitle}</Typography>
                  </CardContent>
                  <CardActions className={classes.actions}>
                    <Link to={(location) => ({ ...location, pathname: `listNews/${map.id}` })} className={classes.link}>LEIA NOTÍCIA COMPLETA</Link>
                    <Link to={(location) => ({ ...location, pathname: `updateNews/${map.id}` })}>
                      <IconButton
                        aria-label="update"
                        onClick={() => {}}
                      >
                        <MdEdit size={32} color="purple" />

                      </IconButton>
                    </Link>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        setToDeleteNews(map);
                        setOpenDelete(true);
                      }}
                    >
                      <MdDelete size={32} color="red" />

                    </IconButton>
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
          )) }
        </Grid>
      </Container>
      <ConfirmModal
        message="Tem certeza que deseja excluir esta notícia?"
        open={openDelete}
        handleConfirm={() => {
          handleDelete();
          setOpenDelete(false);
        }}
        handleCancel={() => {
          setOpenDelete(false);
          setToDeleteNews(undefined);
        }}
      />
      <BackdropLoading open={loading} />
    </>
  );
};

export default ListNews;
