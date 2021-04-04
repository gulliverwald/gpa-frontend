/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useParams } from 'react-router-dom';
import {
  Grid,
  InputAdornment,
  IconButton,
  Modal,
  Card,
} from '@material-ui/core';
import {
  MdSave, MdEdit, MdAdd, MdDelete, MdSend,
} from 'react-icons/md';
import { format } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { WebStore } from '../../../../store/RootReducer';
import AppBar from '../../../../components/AppBar';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import BackdropLoading from '../../../../components/BackdropLoading';
import {
  TextMaskCustom,
  NumberFormatCustom,
} from '../../../../utils/numberMaskFormatter';

import api from '../../../../services/api';
import { addNotification } from '../../../../hooks/toast/redux/reducers/NotificationReducer';

import { Container, useStyles } from './styles';
import { IPatientsInfo } from '../../../patient/redux/types/IPatientsState';
import {
  requestCreateSchedules,
  requestUpdateSchedules,
} from '../../redux/reducers/schedulesReducer';
import { IRequestCreateSchedules } from '../../redux/types/ISchedulesPayloadTypes';
import { ISchedulesInfo } from '../../redux/types/ISchedulesState';
import { useRedirect } from '../../../../hooks';
import toUTCDate from '../../../../utils/toUTCDate';

interface EatingPlanProps {
  id: number;
  guidelines: string;
}

interface AnamneseProps {
  id: number;
  type: string;
  description: string;
}

interface ScheduleProps {
  schedule: ISchedulesInfo;
  anthropometricData: {
    id: number;
    tricipital_skin_fold: number;
    bicipital_skin_fold: number;
    percentage_of_muscle_mass: number;
    waist_circumference: number;
    arm_circumference: number;
    height: number;
    weight: number;
    supra_iliac: number;
    visceral_fat: number;
    suprascapular: number;
    metabolic_age: number;
    bioimpedance: number;
    sum_of_pleats: number;
  };
  anamnesis: Array<{ type: string; descriptions: string }>;
}

function IsolateReRender({ control }: { control: any }): JSX.Element {
  const height: number | undefined = useWatch({
    control,
    name: 'anthropometricData.height',
  });
  const weight: number | undefined = useWatch({
    control,
    name: 'anthropometricData.weight',
  });

  return (
    <Input
      label="IMC"
      variant="standard"
      disabled
      value={(weight || 0) / (height || 1) ** 2}
      InputProps={{
        endAdornment: <InputAdornment position="end">Kg/m²</InputAdornment>,
        inputComponent: NumberFormatCustom as any,
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

const AddSchedule: React.FC = () => {
  const { id, patientId } = useParams<{ id: string; patientId: string }>();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(new Date());
  const { redirect } = useRedirect();

  const [anamnesis, setAnamnesis] = useState<AnamneseProps[]>([]);
  const [patient, setPatient] = useState<IPatientsInfo | null>(null);

  const [openModalEatingPlan, setOpenModalEatingPlan] = useState(false);
  const [eatingPlan, setEatingPlan] = useState<EatingPlanProps>();
  const [schedule, setSchedule] = useState<ScheduleProps>();

  const classes = useStyles();

  const {
    register,
    errors,
    handleSubmit,
    watch,
    control,
    setValue: setValueForm,
    getValues,
    setError,
    clearErrors,
  } = useForm();

  const {
    register: register2,
    errors: errors2,
    handleSubmit: handleSubmit2,
  } = useForm();

  const onSubmitCreateEatingPlan = handleSubmit2((data) => {
    async function submitPA(): Promise<void> {
      setLoading(true);
      if (schedule) {
        try {
          const response = await api.post('/EatingPlan', {
            ...data,
            schedule_id: schedule.schedule.id,
          });
          if (response.data.status !== 'error') {
            setEatingPlan(response.data);
            dispatch(
              addNotification({
                message: 'Plano alimentar criado!',
                options: { variant: 'success' },
                key: Math.random(),
              }),
            );
          } else {
            dispatch(
              addNotification({
                message: 'Erro ao criar plano alimentar!',
                options: { variant: 'error' },
                key: Math.random(),
              }),
            );
          }
        } catch (erro) {
          dispatch(
            addNotification({
              message: 'Erro ao criar plano alimentar!',
              options: { variant: 'error' },
              key: Math.random(),
            }),
          );
        } finally {
          setLoading(false);
          setOpenModalEatingPlan(false);
        }
      }
    }
    submitPA();
  });

  const onSubmitUpdateSchedule = handleSubmit((data) => {
    setLoading(true);
    if (patient && schedule) {
      dispatch(
        requestUpdateSchedules({
          anamnesis: anamnesis as any,
          schedule: {
            ...data.schedule,
            patient_id: patient.id,
            date: new Date(value),
            id: schedule.schedule.id,
          },
          anthropometricData: {
            ...data.anthropometricData,
            id: schedule.anthropometricData.id,
          },
          callback: (data_, error) => {
            if (data_) {
              setSchedule({ ...data_ });
              dispatch(
                addNotification({
                  message: 'Consulta atualizada com sucesso!',
                  options: { variant: 'success' },
                  key: Math.random(),
                }),
              );
            }
            if (error) {
              dispatch(
                addNotification({
                  message: 'Erro ao atualizar consulta!',
                  options: { variant: 'error' },
                  key: Math.random(),
                }),
              );
            }
            setLoading(false);
          },
        }),
      );
    }
  });

  useEffect(() => {
    setLoading(true);
    if (patientId !== undefined) {
      api
        .get(`/users/${patientId}`)
        .then((response) => {
          if (response.data) {
            setPatient(response.data);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    if (id !== undefined) {
      api
        .get(`/schedule/${id}`)
        .then((response) => {
          if (response.data) {
            setSchedule(response.data);
            setValue(toUTCDate(new Date(response.data.schedule.date)));
            setAnamnesis(response.data.anamnesis);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <AppBar title="Editar consulta" />

      <Container>
        <div className="container">
          <h2>
            Paciente:
            {' '}
            {patient?.name}
          </h2>
          <Button type="submit" startIcon={<MdSave />} form="update-schedule">
            Atualizar
          </Button>
        </div>
        <form onSubmit={onSubmitUpdateSchedule} key={1} id="update-schedule">
          <div className="content-container">
            <div className="schedule-container">
              <h1>Dados da Consulta</h1>

              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      label="Data"
                      name="schedule.date"
                      id="schedule.date"
                      variant="inline"
                      inputVariant="outlined"
                      format="dd/MM/yyyy"
                      value={value}
                      onChange={() => setValue}
                      InputAdornmentProps={{ position: 'start' }}
                      inputRef={register({ required: true })}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                  <Input
                    inputRef={register({ required: true, valueAsNumber: true })}
                    variant="standard"
                    id="schedule.value"
                    name="schedule.value"
                    label="Valor"
                    defaultValue={schedule?.schedule.value}
                    key={schedule?.schedule.value}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
                      inputComponent: NumberFormatCustom as any,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    inputRef={register({ required: false })}
                    id="schedule.observation"
                    name="schedule.observation"
                    label="Observações"
                    multiline
                    defaultValue={schedule?.schedule.observation}
                    key={schedule?.schedule.observation}
                    rows={4}
                    className={classes.observation}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>

              <h2>Anamneses</h2>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Input
                    id="anamnesis.type"
                    inputRef={register({ required: false })}
                    name="anamnesis.type"
                    label="Tipo"
                    helperText={
                      !!errors.anamnesis?.type && errors.anamnesis?.type.message
                    }
                    error={!!errors.anamnesis?.type}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    fullWidth
                    inputRef={register({ required: false })}
                    id="anamnesis.description"
                    name="anamnesis.description"
                    label="Descrição"
                    helperText={
                      !!errors.anamnesis?.description
                      && errors.anamnesis?.description.message
                    }
                    error={!!errors.anamnesis?.description}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    onClick={() => {
                      const anamneseForm = getValues();
                      if (!anamneseForm?.anamnesis.description) {
                        setError('anamnesis.description', {
                          message: 'Campo é obrigatório',
                        });
                        return;
                      }
                      clearErrors('anamnesis.description');

                      if (!anamneseForm?.anamnesis.type) {
                        setError('anamnesis.type', {
                          message: 'Campo é obrigatório',
                        });
                        return;
                      }
                      clearErrors('anamnesis.type');

                      setAnamnesis([
                        ...anamnesis,
                        {
                          id: new Date().getTime(),
                          type: watch('anamnesis.type'),
                          description: watch('anamnesis.description'),
                        },
                      ]);
                    }}
                  >
                    <MdAdd size={30} />
                  </IconButton>
                </Grid>
              </Grid>
              <div className="list">
                {anamnesis.map((anamnese) => (
                  <div className="list-item" key={anamnese.id}>
                    <span>
                      <b>Tipo: </b>
                      <span>{`${anamnese.type}`}</span>
                      <b>Descrição: </b>
                      <span>{`${anamnese.description}`}</span>
                    </span>
                    <div className="grow" />
                    <IconButton
                      onClick={() => setAnamnesis(
                        anamnesis.filter((item) => item.id !== anamnese.id),
                      )}
                    >
                      <MdDelete color="red" size={30} />
                    </IconButton>
                  </div>
                ))}
              </div>
              {schedule?.schedule
              && schedule.schedule.eating_plan_id == null ? (
                <button
                  type="button"
                  className="pa-link"
                  onClick={() => setOpenModalEatingPlan(true)}
                >
                  <span>Criar Plano Alimentar</span>
                  <MdSend size={30} color="white" />
                </button>
                ) : (
                  <>
                    {schedule?.schedule.eating_plan_id ? (
                      <button
                        type="button"
                        className="pa-link"
                        onClick={() => {
                          redirect(
                            `/admin/patient/${patientId}/addEatingPlan/${schedule.schedule.eating_plan_id}`,
                          );
                        }}
                      >
                        <span>Visualizar Plano Alimentar</span>
                        <MdSend size={30} color="white" />
                      </button>
                    ) : (
                      ''
                    )}
                  </>
                )}
            </div>

            <div className="antropometric-container">
              <h1>Dados Antropométricos</h1>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <Input
                    inputRef={register({ required: true, valueAsNumber: true })}
                    label="Altura"
                    variant="standard"
                    name="anthropometricData.height"
                    defaultValue={schedule?.anthropometricData.height}
                    key={schedule?.anthropometricData.height}
                    id="anthropometricData.height"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">m</InputAdornment>
                      ),
                      inputComponent: NumberFormatCustom as any,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Input
                    inputRef={register({ required: true, valueAsNumber: true })}
                    label="Peso"
                    variant="standard"
                    name="anthropometricData.weight"
                    id="anthropometricData.weight"
                    defaultValue={schedule?.anthropometricData.weight}
                    key={schedule?.anthropometricData.weight}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">Kg</InputAdornment>
                      ),
                      inputComponent: NumberFormatCustom as any,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <IsolateReRender control={control} />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    inputRef={register({ required: true, valueAsNumber: true })}
                    label="Gordura Viceral"
                    variant="standard"
                    defaultValue={schedule?.anthropometricData.visceral_fat}
                    key={schedule?.anthropometricData.visceral_fat}
                    name="anthropometricData.visceral_fat"
                    id="anthropometricData.visceral_fat"
                    InputProps={{ inputComponent: NumberFormatCustom as any }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    inputRef={register({ required: true, valueAsNumber: true })}
                    label="Idade Metabólica"
                    variant="standard"
                    name="anthropometricData.metabolic_age"
                    id="anthropometricData.metabolic_age"
                    defaultValue={schedule?.anthropometricData.metabolic_age}
                    key={schedule?.anthropometricData.metabolic_age}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">anos</InputAdornment>
                      ),
                      inputComponent: NumberFormatCustom as any,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <h2>Percentual de Gordura</h2>
                </Grid>
                <Grid item xs={6}>
                  <Input
                    inputRef={register({ required: true, valueAsNumber: true })}
                    label="Somatório de Pregas"
                    variant="standard"
                    name="anthropometricData.sum_of_pleats"
                    defaultValue={schedule?.anthropometricData.sum_of_pleats}
                    key={schedule?.anthropometricData.sum_of_pleats}
                    id="anthropometricData.sum_of_pleats"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                      inputComponent: NumberFormatCustom as any,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    inputRef={register({ required: true, valueAsNumber: true })}
                    label="Bioimpedância"
                    variant="standard"
                    name="anthropometricData.bioimpedance"
                    id="anthropometricData.bioimpedance"
                    defaultValue={schedule?.anthropometricData.bioimpedance}
                    key={schedule?.anthropometricData.bioimpedance}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                      inputComponent: NumberFormatCustom as any,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    inputRef={register({ required: true, valueAsNumber: true })}
                    label="Percentual de Massa Muscular"
                    variant="standard"
                    defaultValue={
                      schedule?.anthropometricData.percentage_of_muscle_mass
                    }
                    key={schedule?.anthropometricData.percentage_of_muscle_mass}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                      inputComponent: NumberFormatCustom as any,
                    }}
                    name="anthropometricData.percentage_of_muscle_mass"
                    id="anthropometricData.percentage_of_muscle_mass"
                    className={classes.inputHuge}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    inputRef={register({ required: true, valueAsNumber: true })}
                    label="Circunferência de Braço"
                    variant="standard"
                    name="anthropometricData.arm_circumference"
                    id="anthropometricData.arm_circumference"
                    defaultValue={
                      schedule?.anthropometricData.arm_circumference
                    }
                    key={schedule?.anthropometricData.arm_circumference}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">cm</InputAdornment>
                      ),
                      inputComponent: NumberFormatCustom as any,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    inputRef={register({ required: true, valueAsNumber: true })}
                    label="Circunferência da Cintura"
                    variant="standard"
                    name="anthropometricData.waist_circumference"
                    defaultValue={
                      schedule?.anthropometricData.waist_circumference
                    }
                    key={schedule?.anthropometricData.waist_circumference}
                    id="anthropometricData.waist_circumference"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">cm</InputAdornment>
                      ),
                      inputComponent: NumberFormatCustom as any,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    inputRef={register({ required: true, valueAsNumber: true })}
                    label="Supra ilíaca"
                    variant="standard"
                    name="anthropometricData.supra_iliac"
                    id="anthropometricData.supra_iliac"
                    defaultValue={schedule?.anthropometricData.supra_iliac}
                    key={schedule?.anthropometricData.supra_iliac}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">mm</InputAdornment>
                      ),
                      inputComponent: NumberFormatCustom as any,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    inputRef={register({ required: true, valueAsNumber: true })}
                    label="Supra escapular"
                    variant="standard"
                    name="anthropometricData.suprascapular"
                    id="anthropometricData.suprascapular"
                    defaultValue={schedule?.anthropometricData.suprascapular}
                    key={schedule?.anthropometricData.suprascapular}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">mm</InputAdornment>
                      ),
                      inputComponent: NumberFormatCustom as any,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <h2>Prega Cutânea</h2>
                </Grid>
                <Grid item xs={6}>
                  <Input
                    inputRef={register({ required: true, valueAsNumber: true })}
                    label="Biciptal"
                    variant="standard"
                    defaultValue={
                      schedule?.anthropometricData.bicipital_skin_fold
                    }
                    key={schedule?.anthropometricData.bicipital_skin_fold}
                    name="anthropometricData.bicipital_skin_fold"
                    id="anthropometricData.bicipital_skin_fold"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">mm</InputAdornment>
                      ),
                      inputComponent: NumberFormatCustom as any,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    inputRef={register({ required: true, valueAsNumber: true })}
                    label="Triciptal"
                    variant="standard"
                    name="anthropometricData.tricipital_skin_fold"
                    id="anthropometricData.tricipital_skin_fold"
                    defaultValue={
                      schedule?.anthropometricData.tricipital_skin_fold
                    }
                    key={schedule?.anthropometricData.tricipital_skin_fold}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">mm</InputAdornment>
                      ),
                      inputComponent: NumberFormatCustom as any,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        </form>
      </Container>

      <Modal
        open={openModalEatingPlan}
        onClose={() => {
          setOpenModalEatingPlan(false);
        }}
        className={classes.modalContainer}
      >
        <Card className={classes.modalCard}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h2>Adicionar Plano Alimentar</h2>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={onSubmitCreateEatingPlan} key={1} id="update-pa">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Input
                      inputRef={register2({ required: true })}
                      fullWidth
                      id="guidelines"
                      name="guidelines"
                      label="Orientações"
                    />
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
          <div className={classes.buttonCardContainer}>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              onClick={() => {
                setOpenModalEatingPlan(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              form="update-pa"
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Confirmar
            </Button>
          </div>
        </Card>
      </Modal>

      <BackdropLoading open={loading} />
    </>
  );
};

export default AddSchedule;
