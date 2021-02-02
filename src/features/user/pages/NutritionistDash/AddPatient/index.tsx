import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  AppBar, Button, TextField, InputAdornment,
} from '@material-ui/core';
import { MdArrowBack, MdSave, MdLock } from 'react-icons/md';
import {
  Container, ButtonAppbar, MainContainer, useStyles,
} from './styles';

function generatePassword(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const AddPatient: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => { console.log(data); });

  return (
    <Container>
      <AppBar className={classes.appbar}>
        <p><b>Adicionar Paciente</b></p>
        <ButtonAppbar onClick={() => history.goBack()} className={classes.returnAppbar}>
          <MdArrowBack size={20} />
          Voltar
        </ButtonAppbar>
      </AppBar>
      <MainContainer>
        <form onSubmit={onSubmit} className={classes.form}>
          <div className={classes.formColumn}>
            <h2 style={{ color: 'GrayText' }}>Dados Pessoais</h2>
            <TextField
              inputRef={register({ required: true })}
              id="name"
              name="name"
              label="Nome"
              variant="outlined"
              autoComplete="off"
              className={classes.inputForm}
            />
            <TextField
              inputRef={register({ required: true })}
              id="cpf"
              name="cpf"
              label="CPF"
              variant="outlined"
              autoComplete="off"
              className={classes.inputForm}
            />
            <TextField
              inputRef={register({ required: true })}
              id="date"
              name="date"
              label="Data de Nascimento"
              defaultValue={Date.now}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.inputFormTiny}
            />
            <TextField
              inputRef={register({ required: true })}
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              autoComplete="off"
              className={classes.inputForm}
            />
            <TextField
              inputRef={register({ required: true })}
              id="password"
              name="password"
              label="Senha"
              defaultValue={generatePassword(6)}
              variant="outlined"
              helperText="Senha gerada aleatoriamente"
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <MdLock />
                  </InputAdornment>
                ),
              }}
              className={classes.inputForm}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<MdSave />}
              className={classes.buttonForm}
            >
              Salvar
            </Button>
          </div>
          <div className={classes.formColumn}>
            <h2 style={{ color: 'GrayText' }}>Endereço</h2>
            <TextField
              inputRef={register({ required: true })}
              id="cep"
              name="cep"
              label="CEP"
              variant="outlined"
              className={classes.inputForm}
            />
            <div className={classes.streetForm}>
              <TextField
                inputRef={register({ required: true })}
                id="street"
                name="street"
                label="Rua/Logradouro"
                variant="outlined"
                className={classes.inputForm}
              />
              <TextField
                inputRef={register({ required: true })}
                id="street_number"
                name="street_number"
                label="Nº"
                variant="outlined"
                className={classes.inputFormTiny}
              />
            </div>
            <TextField
              inputRef={register({ required: true })}
              id="phone"
              name="phone"
              label="Telefone"
              variant="outlined"
              className={classes.inputForm}
              helperText="Coloque apenas o número"
            />
          </div>
        </form>
      </MainContainer>
    </Container>
  );
};

export default AddPatient;
