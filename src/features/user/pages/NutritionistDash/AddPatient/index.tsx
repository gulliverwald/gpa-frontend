import React from 'react';
import { useForm } from 'react-hook-form';
import { InputAdornment } from '@material-ui/core';
import { MdSave, MdLock } from 'react-icons/md';
import api from '../../../../../services/api';
import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';
import AppBar from '../../../../../components/AppBar';
import { PatientProps } from './PatientProps';
import {
  Container, MainContainer, useStyles,
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

  const { register, handleSubmit } = useForm();

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTIzNTY5MTIsImV4cCI6MTYxMjQ0MzMxMiwic3ViIjoiMSJ9.LGujUx7jj2OPvWMQegEKLsu_n6_OUKiggtM2-3hhrtQ';
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const onSubmit = handleSubmit((data: PatientProps) => {
    console.log(data);
    data.authorization = 1;
    data.district = 'B';
    data.complement = 'Casa';
    data.city_id = 1;
    api.post('/Users', { data }, config);
  });

  return (
    <Container>
      <AppBar />
      <MainContainer>
        <form onSubmit={onSubmit} className={classes.form}>
          <div className={classes.formColumn}>
            <h2 style={{ color: 'GrayText' }}>Dados Pessoais</h2>
            <Input
              inputRef={register({ required: true })}
              id="name"
              name="name"
              label="Nome"
              className={classes.inputForm}
            />
            <Input
              inputRef={register({ required: true })}
              id="cpf"
              name="cpf"
              label="CPF"
              className={classes.inputForm}
            />
            <Input
              inputRef={register({ required: true })}
              type="date"
              id="birthday"
              name="birthday"
              label="Data de Nascimento"
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.inputFormTiny}
            />
            <Input
              inputRef={register({ required: true })}
              id="email"
              name="email"
              label="Email"
              className={classes.inputForm}
            />
            <Input
              inputRef={register({ required: true })}
              id="password"
              name="password"
              label="Senha"
              defaultValue={generatePassword(6)}
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
              startIcon={<MdSave />}
              className={classes.buttonForm}
            >
              Salvar
            </Button>
          </div>
          <div className={classes.formColumn}>
            <h2 style={{ color: 'GrayText' }}>Endereço</h2>
            <Input
              inputRef={register({ required: true })}
              id="zipCode"
              name="zipCode"
              label="CEP"
              className={classes.inputForm}
            />
            <div className={classes.streetForm}>
              <Input
                inputRef={register({ required: true })}
                id="street"
                name="street"
                label="Rua/Logradouro"
                className={classes.inputForm}
              />
              <Input
                inputRef={register({ required: true })}
                id="number"
                name="number"
                label="Nº"
                className={classes.inputFormTiny}
              />
            </div>
            <Input
              inputRef={register({ required: true })}
              id="phone"
              name="phone"
              label="Telefone"
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
