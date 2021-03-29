/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Grid } from '@material-ui/core';
import { MdSave, MdLock } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import api from '../../../../services/api';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import AppBar from '../../../../components/AppBar';
import { PatientProps } from './PatientProps';
import { Container, MainContainer, useStyles } from './styles';
import { WebStore } from '../../../../store/RootReducer';
import BackdropLoading from '../../../../components/BackdropLoading';
import { IPatientsInfo } from '../../redux/types/IPatientsState';
import { addNotification } from '../../../../hooks/toast/redux/reducers/NotificationReducer';
import { requestUpdatePatients } from '../../redux/reducers/patientsReducer';
import { IRequestUpdatePatients } from '../../redux/types/IPatientsPayloadTypes';

function generatePassword(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const EditPatient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const classes = useStyles();
  const patient = useSelector((state: WebStore) =>
    state.patient.patients.find((patient_) => patient_.id.toString() === id));
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [defaultPatient, setDefaultPatient] = useState<IPatientsInfo | null>(null);

  useEffect(() => {
    if (!patient) {
      setLoading(true);
      api
        .get(`/users/${id}`)
        .then((response) => {
          if (response.data) {
            setDefaultPatient(response.data);
          }
        })
        .catch((err) => {
          dispatch(addNotification({
            key: Math.random(),
            message: err.response.data.message,
            options: {
              variant: 'error',
            },
          }));
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setDefaultPatient(patient);
    }
  }, []);

  const { register, handleSubmit, control } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.table(data);
    setLoading(true);
    dispatch(requestUpdatePatients({
      id: parseInt(id, 10),
      ...data,
      callback: (data_, error) => {
        if (data_) {
          dispatch(addNotification({
            key: Math.random(),
            message: 'Paciente atualizado',
            options: {
              variant: 'success',
            },
          }));
        }
        if (error) {
          dispatch(addNotification({
            key: Math.random(),
            message: error,
            options: {
              variant: 'error',
            },
          }));
        }
        setLoading(false);
      },
    } as IRequestUpdatePatients));
  });

  return (
    <Container>
      <BackdropLoading open={loading} />
      <AppBar title="Editar paciente" />
      <MainContainer>
        <form onSubmit={onSubmit} className={classes.form}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <h2 style={{ color: 'GrayText' }}>Dados Pessoais</h2>
              <Grid item xs={12}>
                <Input
                  fullWidth
                  key={defaultPatient?.name}
                  inputRef={register({ required: true })}
                  id="name"
                  defaultValue={defaultPatient?.name}
                  name="name"
                  label="Nome"
                  className={classes.inputForm}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  inputRef={register({ required: true })}
                  id="cpf"
                  defaultValue={defaultPatient?.cpf}
                  key={defaultPatient?.cpf}
                  name="cpf"
                  label="CPF"
                  className={classes.inputForm}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  inputRef={register({ required: true })}
                  type="date"
                  name="birthday"
                  id="birthday"
                  defaultValue={defaultPatient?.birthday.split('T')[0]}
                  label="Data de Nascimento"
                  key={defaultPatient?.birthday}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.inputForm}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  inputRef={register({ required: true })}
                  id="email"
                  key={defaultPatient?.email}
                  defaultValue={defaultPatient?.email}
                  name="email"
                  label="Email"
                  className={classes.inputForm}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" startIcon={<MdSave />}>
                  Salvar
                </Button>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <h2 style={{ color: 'GrayText' }}>Endereço</h2>
              <Grid item xs={9}>
                <Input
                  inputRef={register({ required: true })}
                  id="zipCode"
                  key={defaultPatient?.zip}
                  defaultValue={defaultPatient?.zip}
                  name="zipCode"
                  label="CEP"
                  className={classes.inputForm}
                />
              </Grid>

              <Grid item xs={9}>
                <Input
                  inputRef={register({ required: true })}
                  id="street"
                  defaultValue={defaultPatient?.street}
                  name="street"
                  key={defaultPatient?.street}
                  label="Rua/Logradouro"
                  className={classes.inputForm}
                />
              </Grid>

              <Grid item xs={3}>
                <Input
                  key={defaultPatient?.number}
                  inputRef={register({ required: true })}
                  id="number"
                  name="number"
                  defaultValue={defaultPatient?.number}
                  label="Nº"
                  className={classes.inputFormTiny}
                />
              </Grid>

              <Grid item xs={9}>
                <Input
                  key={defaultPatient?.phone}
                  inputRef={register({ required: true })}
                  id="phone"
                  name="phone"
                  defaultValue={defaultPatient?.phone}
                  label="Telefone"
                  className={classes.inputForm}
                  helperText="Coloque apenas o número"
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </MainContainer>
    </Container>
  );
};

export default EditPatient;
