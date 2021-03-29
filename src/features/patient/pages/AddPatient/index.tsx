/* eslint-disable no-nested-ternary */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { InputAdornment, Grid, MenuItem } from '@material-ui/core';
import { MdSave, MdLock } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import api from '../../../../services/api';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import AppBar from '../../../../components/AppBar';
import { PatientProps } from './PatientProps';
import {
  Container, MainContainer, useStyles,
} from './styles';
import Select from '../../../../components/Select';
import states from '../../../../constants/states';
import Switch from '../../../../components/Switch';
import { requestCreatePatients } from '../../redux/reducers/patientsReducer';
import { IRequestCreatePatients } from '../../redux/types/IPatientsPayloadTypes';
import { addNotification } from '../../../../hooks/toast/redux/reducers/NotificationReducer';
import BackdropLoading from '../../../../components/BackdropLoading';
import { useRedirect } from '../../../../hooks';

interface ICities {
  id: number,
  name: string;
  uf: string;
}

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
  const [loading, setLoading] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [cities, setCities] = useState<ICities[]>([] as ICities[]);
  const dispatch = useDispatch();
  const { redirect } = useRedirect();

  const {
    register, handleSubmit, control, watch, getValues,
  } = useForm();

  const onSubmit = handleSubmit((data: PatientProps) => {
    console.table(data);
    setLoading(true);
    dispatch(requestCreatePatients({
      ...data as any,
      birthday: new Date(data.birthday),
      callback: (data_, error) => {
        setLoading(false);
        if (data_) {
          dispatch(addNotification({
            message: 'Paciente cadastrado!',
            key: Math.random(),
            options: {
              variant: 'success',
            },
          }));
          redirect('/admin/listPatient');
        }
        if (error) {
          dispatch(addNotification({
            message: 'Erro ao cadastrar o paciente!',
            key: Math.random(),
            options: {
              variant: 'error',
            },
          }));
        }
      },
    }));
  });

  const handleChangeState = useCallback((event) => {
    if (event.target?.value) {
      setLoadingCities(true);
      api.get(`/Select/City/${event.target?.value}`).then((response) => {
        setCities(response.data);
      }).catch((error) => {
        setCities([]);
      }).finally(() => {
        setLoadingCities(false);
      });
    }
  }, []);

  return (
    <Container>
      <AppBar title="Adicionar paciente" />
      <MainContainer>

        <form
          onSubmit={onSubmit}
          style={{
            alignSelf: 'center',
            maxWidth: '80%',
          }}
          className={classes.form}
        >
          <Grid container xs={12} spacing={3}>
            <Grid item xs={12}>
              <h2 style={{ color: 'GrayText' }}>Dados Pessoais</h2>
            </Grid>
            <Grid item xs={6}>
              <Input
                fullWidth
                disabled={loading}
                inputRef={register({ required: true })}
                id="name"
                name="name"
                label="Nome *"
              />
            </Grid>
            <Grid item xs={3}>
              <Input
                fullWidth
                disabled={loading}
                inputRef={register({ required: true })}
                id="cpf"
                name="cpf"
                label="CPF *"
              />
            </Grid>
            <Grid item xs={3}>
              <Input
                fullWidth
                disabled={loading}
                inputRef={register({ required: true })}
                type="date"
                id="birthday"
                name="birthday"
                label="Data de Nascimento *"
                InputLabelProps={{
                  shrink: true,
                }}

              />
            </Grid>
            <Grid item xs={12}>
              <h2 style={{ color: 'GrayText' }}>Endereço</h2>
            </Grid>
            <Grid item xs={2}>
              <Input
                fullWidth
                disabled={loading}
                inputRef={register({ required: true, valueAsNumber: true })}
                id="zipCode"
                type="number"
                name="zipCode"
                label="CEP *"
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                fullWidth
                disabled={loading}
                inputRef={register({ required: true })}
                id="street"
                name="street"
                label="Rua/Logradouro *"

              />
            </Grid>
            <Grid item xs={2}>
              <Input
                fullWidth
                disabled={loading}
                type="number"
                inputRef={register({ required: true, valueAsNumber: true })}
                id="number"
                name="number"
                label="Nº"

              />
            </Grid>
            <Grid item xs={2}>
              <Input
                fullWidth
                disabled={loading}
                inputRef={register({ required: true })}
                id="district"
                name="district"
                label="Bairro *"

              />
            </Grid>
            <Grid item xs={4}>
              <Input
                fullWidth
                disabled={loading}
                inputRef={register({ required: false })}
                id="complement"
                name="complement"
                label="Complemento"
              />
            </Grid>
            <Grid item xs={3}>
              <Select
                id="state"
                name="state"
                label="UF *"
                selectProps={{
                  disabled: loading,
                  onClick: (event) => handleChangeState(event),
                }}
                control={control}
              >
                {states.map((state_: string) => (
                  <MenuItem key={state_} value={state_}>
                    {state_}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={5}>
              <Select
                id="city"
                loading={loadingCities}
                name="city_id"
                label="Cidade *"
                control={control}
                selectProps={{
                  disabled: loading,
                }}
              >
                {watch('state') ? (cities.length === 0 ? (
                  <MenuItem disabled key={1} value={1}>
                    Nenhuma cidade encontrada, selecione um novo estado
                  </MenuItem>
                ) : cities.map((city) => (
                  <MenuItem key={city.id} value={city.id}>
                    {city.name}
                  </MenuItem>
                ))) : (
                  <MenuItem key={1} value={1} disabled>
                    Selecione um Estado
                  </MenuItem>
                )}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <h2 style={{ color: 'GrayText' }}>Contato</h2>
            </Grid>
            <Grid item xs={4}>
              <Input
                inputRef={register({ required: true })}
                id="email"
                name="email"
                label="Email *"
                fullWidth
                disabled={loading}

              />
            </Grid>
            <Grid item xs={4}>
              <Input
                inputRef={register({ required: true })}
                id="phone"
                fullWidth
                disabled={loading}
                name="phone"
                label="Telefone *"
                helperText="Coloque apenas o número"
              />
            </Grid>
            <Grid item xs={12}>
              <h2 style={{ color: 'GrayText' }}>Senha e Acesso</h2>
            </Grid>
            <Grid item xs={4}>
              <Input
                inputRef={register({ required: true })}
                id="password"
                fullWidth
                disabled={loading}
                name="password"
                label="Senha *"
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

              />
            </Grid>
            <Grid item xs={4}>
              <Switch
                switchProps={{
                  inputRef: register,
                }}
                label="Acesso"
                name="authorization"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                disabled={loading}
                startIcon={<MdSave />}
              >
                Salvar
              </Button>
            </Grid>
          </Grid>
        </form>
      </MainContainer>
      <BackdropLoading open={loading} />
    </Container>
  );
};

export default AddPatient;
