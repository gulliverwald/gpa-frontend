import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';
import { MdDelete } from 'react-icons/md';
import { IoMdAlert } from 'react-icons/io';
import api from '../../../../../services/api';
import AppBar from '../../../../../components/AppBar';
import {
  Container, MainContainer, useStyles,
} from './styles';

interface TipProps{
  content: string;
}

const AddNews: React.FC = () => {
  const classes = useStyles();
  const [aux, setAux] = useState(false);
  const [tip, setTip] = useState<TipProps>();

  const { register, errors, handleSubmit } = useForm();
  const {
    register: register2,
    errors: errors2,
    handleSubmit: handleSubmit2,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const onSubmitTip = handleSubmit2((data) => {
    console.log(data);
  });

  const firstUpdate = useRef(true);
  useEffect(() => {
    // async function deleteTip() {
    //   await fetch('localhost:3333/tip/', { method: 'DELETE' });
    // }

    // deleteTip();
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    console.log('DELETE DICA');
  }, [aux]);

  useEffect(() => {
    async function handleTip(): Promise<void> {
      const response = await api.get('/Tip');
      setTip(response.data);
    }
    handleTip();
  }, []);

  return (
    <Container>
      <AppBar title="Adicionar Notícia / Dica do Dia" />
      <MainContainer>
        <h2>Adicionar Notícia</h2>
        <form key={1} onSubmit={onSubmit} className={classes.form} encType="multipart/form-data">
          <div className={classes.formColumn}>
            <TextField
              inputRef={register({ required: 'Título é necessário!', maxLength: { value: 2, message: 'error message' } })}
              id="newsTitle"
              name="newsTitle"
              label="Título"
              variant="outlined"
              autoComplete="off"
              className={classes.inputForm}
              helperText="Digite o Título da Notícia"
            />
            <span>
              {errors.newsTitle && errors.newsTitle.type === 'required' && (
              <>
                <p className={classes.inputAlert}>
                  <IoMdAlert color="red" style={{ margin: '0px 8px' }} />
                  {errors.newsTitle.message}
                </p>
              </>
              ) }
            </span>
            <TextField
              inputRef={register({ required: 'Subtítulo é necessário!' })}
              id="newsSubtitle"
              name="newsSubtitle"
              label="Subtítulo"
              variant="outlined"
              autoComplete="off"
              className={classes.inputForm}
              helperText="Digite o Subtítulo da Notícia"
            />
            <span>
              {errors.newsSubtitle && errors.newsSubtitle.type === 'required' && (
              <>
                <p className={classes.inputAlert}>
                  <IoMdAlert color="red" style={{ margin: '0px 8px' }} />
                  {errors.newsSubtitle.message}
                </p>
              </>
              ) }
            </span>
            <TextField
              inputRef={register({ required: true })}
              id="newsBody"
              name="newsBody"
              label="Corpo da Notícia"
              variant="outlined"
              autoComplete="off"
              rows={5}
              multiline
              className={classes.inputFormBody}
            />
            {errors.body && <p>This is required!</p>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.buttonForm}
            >
              Postar
            </Button>
          </div>
          <div className={classes.formColumn}>
            <TextField
              inputRef={register({ required: true })}
              id="date"
              name="date"
              label="Data"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.inputFormTiny}
            />
            <TextField
              inputRef={register({ required: true })}
              type="file"
              id="newsImage"
              name="newsImage"
              label="Imagem da Notícia"
              inputProps={
                { accept: 'image/png' }
              }
            />
          </div>
        </form>

        <h2 style={{ margin: '8px' }}>Dica do Dia</h2>
        <form key={2} onSubmit={onSubmitTip} className={classes.formTip}>
          <TextField
            inputRef={register2({ required: true })}
            id="tip"
            name="tip"
            label="Texto da Dica"
            defaultValue={tip}
            variant="outlined"
            autoComplete="off"
            className={classes.inputForm}
          />
          {errors2.tip && <p>This is required</p>}
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.inputFormTiny}
            >
              Postar
            </Button>
            <Button onClick={() => { setAux(!aux); }}><MdDelete size={28} color="red" /></Button>
          </div>
        </form>
      </MainContainer>
    </Container>
  );
};

export default AddNews;
