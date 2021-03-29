import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Grid,
} from '@material-ui/core';
import { IoMdAlert } from 'react-icons/io';
import api from '../../../../services/api';
import { WebStore } from '../../../../store/RootReducer';
import AppBar from '../../../../components/AppBar';
import BackdropLoading from '../../../../components/BackdropLoading';
import Input from '../../../../components/Input';
import {
  Container, MainContainer, useStyles,
} from './styles';
import { requestUpdateNews } from '../../redux/reducers/newsReducer';
import { IRequestUpdateNews } from '../../redux/types/INewsPayloadTypes';
import { INewsInfo } from '../../redux/types/INewsState';
import { addNotification } from '../../../../hooks/toast/redux/reducers/NotificationReducer';

const AddNews: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  // eslint-disable-next-line max-len
  const news = useSelector((store: WebStore) => store.news.news.find((news_) => news_.id === parseInt(id, 10)));
  const userId = useSelector((store: WebStore) => store.user.state.userInfo.user.id);
  const [defaultNews, setDefaultNews] = useState<INewsInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const {
    register, errors, handleSubmit,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    if (news) {
      dispatch(
        requestUpdateNews({
          id: news.id,
          date: news.date.toString(),
          nutritionist_id: userId,
          ...data,
        } as IRequestUpdateNews),
      );
      if (data) {
        dispatch(
          addNotification({
            message: 'Atualização realizada com sucesso!',
            options: { variant: 'success' },
            key: Math.random(),
          }),
        );
      }
    }
  });

  useEffect(() => {
    if (!news) {
      setLoading(true);
      api
        .get(`/News/${id}`)
        .then((response) => {
          if (response.data) {
            setDefaultNews(response.data);
          }
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setDefaultNews(news);
    }
  }, []);

  return (
    <>
      <Container>
        <BackdropLoading open={loading} />

        <AppBar title={`Atualizar Notícia / ${defaultNews?.title}`} />
        <MainContainer>
          <h2 style={{ margin: '16px' }}>Atualizar Notícia</h2>
          <form
            key={1}
            onSubmit={onSubmit}
            encType="multipart/form-data"
          >
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Input
                  key={defaultNews?.title}
                  defaultValue={news?.title || defaultNews?.title}
                  inputRef={register({ required: 'Título é necessário!' })}
                  required
                  id="title"
                  name="title"
                  label="Título"
                  variant="outlined"
                  autoComplete="off"
                  className={classes.inputForm}
                  helperText="Digite o Título da Notícia"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <span>
                  {errors.title && errors.title.type === 'required' && (
                  <>
                    <p className={classes.inputAlert}>
                      <IoMdAlert color="red" style={{ margin: '0px 8px' }} />
                      {errors.title.message}
                    </p>
                  </>
                  ) }
                </span>
              </Grid>

              <Grid item xs={6}>
                <Input
                  key={defaultNews?.subtitle}
                  defaultValue={news?.subtitle || defaultNews?.subtitle}
                  inputRef={register({ required: false })}
                  id="subtitle"
                  name="subtitle"
                  label="Subtítulo"
                  variant="outlined"
                  autoComplete="off"
                  className={classes.inputForm}
                  helperText="Digite o Subtítulo da Notícia"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <span>
                  {errors.subtitle && errors.subtitle.type === 'required' && (
                  <>
                    <p className={classes.inputAlert}>
                      <IoMdAlert color="red" style={{ margin: '0px 8px' }} />
                      {errors.subtitle.message}
                    </p>
                  </>
                  ) }
                </span>
              </Grid>

              <Grid item xs={6}>
                <Input
                  required
                  key={defaultNews?.date}
                  defaultValue={defaultNews?.date.split('T')[0]}
                  inputRef={register({ required: true })}
                  id="date"
                  name="date"
                  label="Data"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.inputForm}
                />
              </Grid>

              <Grid item xs={6}>
                <Input
                  key={defaultNews?.image_link}
                  defaultValue={news?.image_link || defaultNews?.image_link}
                  inputRef={register({ required: true })}
                  required
                  id="image_link"
                  name="image_link"
                  label="Imagem da Notícia"
                  variant="standard"
                  className={classes.inputForm}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Input
                  defaultValue={news?.description || defaultNews?.description}
                  inputRef={register({ required: true })}
                  required
                  id="description"
                  name="description"
                  label="Corpo da Notícia"
                  variant="outlined"
                  autoComplete="off"
                  rows={5}
                  multiline
                  className={classes.inputFormBody}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {errors.description && <p>This is required!</p>}
              </Grid>

              <Grid item xs={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.buttonForm}
                >
                  Atualizar
                </Button>
              </Grid>
            </Grid>
          </form>
        </MainContainer>
      </Container>
    </>
  );
};

export default AddNews;
