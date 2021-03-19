import React, { useEffect, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, TextField, Grid, CircularProgress,
} from '@material-ui/core';
import { MdDelete } from 'react-icons/md';
import { IoMdAlert } from 'react-icons/io';
import api from '../../../../services/api';
import { WebStore } from '../../../../store/RootReducer';
import AppBar from '../../../../components/AppBar';
import BackdropLoading from '../../../../components/BackdropLoading';
import {
  Container, MainContainer, useStyles,
} from './styles';
import { requestCreateNews } from '../../redux/reducers/newsReducer';
import { IRequestCreateNews } from '../../redux/types/INewsPayloadTypes';
import { addNotification } from '../../../../hooks/toast/redux/reducers/NotificationReducer';

const AddNews: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const dataPost = new Date();
  const userId = useSelector((store: WebStore) => store.user.state.userInfo.user.id);

  const [loading, setLoading] = useState(false);

  const {
    register, errors, handleSubmit, clearErrors, reset,
  } = useForm();
  const {
    register: registerTip,
    errors: errorsTip,
    handleSubmit: handleSubmitTip,
    setValue: setValueTip,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    setLoading(true);
    dispatch(requestCreateNews({
      ...data,
      nutritionist_id: userId,
      callback: (data_, error) => {
        if (data_) {
          dispatch(addNotification({ message: 'Dica deletada com sucesso!', options: { variant: 'success' }, key: Math.random() }));
          clearErrors();
          reset();
        }
        if (error) {
          dispatch(addNotification({ message: 'Erro em deletar Dica!', options: { variant: 'error' }, key: Math.random() }));
        }
        setLoading(false);
      },
    } as IRequestCreateNews));
  });

  const onSubmitTip = handleSubmitTip((data) => {
    async function submitTip(): Promise<void> {
      setLoading(true);
      try {
        const response = await api.post('/Tip', { ...data, date: dataPost.toLocaleDateString(), nutritionist_id: userId });
        if (response.data.status !== 'error') {
          dispatch(addNotification({ message: 'Dica postada com sucesso!', options: { variant: 'success' }, key: Math.random() }));
        } else {
          dispatch(addNotification({ message: 'Erro em inserir Dica!', options: { variant: 'error' }, key: Math.random() }));
        }
      } catch (erro) {
        dispatch(addNotification({ message: 'Erro em inserir Dica!', options: { variant: 'error' }, key: Math.random() }));
      } finally {
        setLoading(false);
      }
    }
    submitTip();
  });

  const handleDeleteTip = () => {
    async function deleteTip(): Promise<void> {
      const response = await api.get('/Tip');
      setLoading(true);
      try {
        const res = await api.delete(`/Tip/${response.data.pop().id}`);
        if (res.data.status !== 'error') {
          setValueTip('content', '');
          dispatch(addNotification({ message: 'Dica deletada com sucesso!', options: { variant: 'success' }, key: Math.random() }));
        } else {
          dispatch(addNotification({ message: 'Erro em deletar Dica!', options: { variant: 'error' }, key: Math.random() }));
        }
      } catch (erro) {
        dispatch(addNotification({ message: 'Erro em deletar Dica!', options: { variant: 'error' }, key: Math.random() }));
      } finally {
        setLoading(false);
      }
    }
    deleteTip();
  };

  useEffect(
    () => {
      async function handleTips(): Promise<void> {
        try {
          const response = await api.get('/Tip');
          setValueTip('content', response.data.pop().content);
        } catch (erro) {
          dispatch(addNotification({ message: 'Dica vazia!', options: { variant: 'error' }, key: Math.random() }));
        }
      }
      handleTips();
    },
    [],
  );

  return (
    <Container>
      <BackdropLoading open={loading} />
      <AppBar title="Adicionar Notícia / Dica do Dia" />
      <MainContainer>
        <h2 style={{ margin: '16px' }}>Adicionar Notícia</h2>
        <form
          key={1}
          onSubmit={onSubmit}
          encType="multipart/form-data"
        >
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                inputRef={register({ required: 'Título é necessário!' })}
                required
                id="title"
                name="title"
                label="Título"
                variant="outlined"
                autoComplete="off"
                className={classes.inputForm}
                helperText="Digite o Título da Notícia"
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
              <TextField
                inputRef={register({ required: false })}
                id="subtitle"
                name="subtitle"
                label="Subtítulo"
                variant="outlined"
                autoComplete="off"
                className={classes.inputForm}
                helperText="Digite o Subtítulo da Notícia"
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
              <TextField
                inputRef={register({ required: true })}
                required
                id="date"
                name="date"
                label="Data"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.inputFormTiny}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                inputRef={register({ required: true })}
                required
                id="image_link"
                name="image_link"
                label="Imagem da Notícia"
                variant="standard"
                className={classes.inputForm}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
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
                Postar
              </Button>
            </Grid>
          </Grid>
        </form>

        <h2 style={{ margin: '16px' }}>Dica do Dia</h2>
        <form key={2} onSubmit={onSubmitTip}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                inputRef={registerTip({ required: true })}
                required
                id="content"
                name="content"
                label="Texto da Dica"
                variant="outlined"
                autoComplete="off"
                InputLabelProps={{ shrink: true }}
                className={classes.inputForm}
              />
              {errorsTip.tip && <p>Este campo é obrigatório</p>}
            </Grid>

            <Grid item xs={6}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.inputFormTiny}
              >
                Postar
              </Button>
              <Button onClick={handleDeleteTip}><MdDelete size={28} color="red" /></Button>
            </Grid>
          </Grid>
        </form>
      </MainContainer>
    </Container>
  );
};

export default AddNews;
