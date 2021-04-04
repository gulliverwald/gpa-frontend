/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
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
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

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
import { requestCreateSchedules, requestUpdateSchedules } from '../../redux/reducers/schedulesReducer';
import { IRequestCreateSchedules } from '../../redux/types/ISchedulesPayloadTypes';
import { ISchedulesInfo } from '../../redux/types/ISchedulesState';

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
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(new Date());

  const [anamnesis, setAnamnesis] = useState<AnamneseProps[]>([]);
  const [patient, setPatient] = useState<IPatientsInfo | null>(null);

  const [openModalEatingPlan, setOpenModalEatingPlan] = useState(false);
  const [eatingPlan, setEatingPlan] = useState<EatingPlanProps>();
  const [schedule, setSchedule] = useState<ScheduleProps>();

  const classes = useStyles();

  const [values, setValues] = useState('');

  const {
    register, errors, handleSubmit, watch, control, getValues, setError, clearErrors,
  } = useForm();

  const {
    register: register2,
    errors: errors2,
    handleSubmit: handleSubmit2,
  } = useForm();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(event.target.value);
  };

  const onSubmitCreateEatingPlan = handleSubmit2((data) => {
    async function submitPA(): Promise<void> {
      setLoading(true);
      if (schedule) {
        try {
          const response = await api.post('/EatingPlan', { ...data, schedule_id: schedule.schedule.id });
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

  const onSubmitCreateSchedule = handleSubmit((data) => {
    setLoading(true);
    if (patient) {
      dispatch(
        requestCreateSchedules({
          anamnesis: anamnesis as any,
          schedule: {
            ...data.schedule,
            patient_id: patient.id,
            date: new Date(value),
          },
          anthropometricData: data.anthropometricData,
          // anthropometric_data_id: data.anthropometric_data_id,
          callback: (data_, error) => {
            if (data_) {
              setSchedule({ ...data_ });
              dispatch(
                addNotification({
                  message: 'Consulta criada com sucesso!',
                  options: { variant: 'success' },
                  key: Math.random(),
                }),
              );
            }
            if (error) {
              dispatch(
                addNotification({
                  message: 'Erro ao criar consulta!',
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
          anthropometricData: { ...data.anthropometricData, id: schedule.anthropometricData.id },
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
    if (id !== undefined) {
      api
        .get(`/users/${id}`)
        .then((response) => {
          if (response.data.id) {
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

  return (
    <>
      <AppBar title="Adicionar nova consulta" />

      <Container>
        <div className="container">
          <h2>
            Paciente:
            {' '}
            {patient?.name}
          </h2>
          {schedule ? (
            <Button type="submit" startIcon={<MdSave />} form="create-schedule">
              Atualizar
            </Button>
          ) : (
            <Button type="submit" startIcon={<MdSave />} form="create-schedule">
              Salvar
            </Button>
          )}
          {/* <Button type="submit" startIcon={<MdSave />} form="create-schedule">
            Salvar
          </Button> */}
        </div>
        <form onSubmit={schedule ? onSubmitUpdateSchedule : onSubmitCreateSchedule} key={1} id="create-schedule">
          <div className="content-container">
            <div className="schedule-container">
              <h1>Dados da Consulta</h1>

              <Grid container spacing={3}>
                <Grid item xs={6}>
                  {/* <Input
                    inputRef={register({ required: true })}
                    variant="standard"
                    type="date"
                    name="schedule.date"
                    id="schedule.date"
                    label="Data"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  /> */}
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
                    value={values}
                    onChange={handleChange}
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
                    helperText={
                      !!errors.anamnesis?.type && errors.anamnesis?.type.message
                    }
                    error={!!errors.anamnesis?.type}
                    label="Tipo"
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
              {schedule && !eatingPlan ? (
                <button
                  type="button"
                  className="pa-link"
                  onClick={() => setOpenModalEatingPlan(true)}
                >
                  <span>Criar Plano Alimentar</span>
                  <MdSend size={30} color="white" />
                </button>
              )
                : (
                  <>
                    {eatingPlan ? (
                      <Link to={`/admin/addEatingPlan/${eatingPlan.id}`}>
                        <button type="button" className="pa-link">
                          <span>Visualizar Plano Alimentar</span>
                          <MdSend size={30} color="white" />
                        </button>
                      </Link>
                    ) : ''}
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
                    label="Gordura Visceral"
                    variant="standard"
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
              <form onSubmit={onSubmitCreateEatingPlan} key={1} id="create-pa">
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
              form="create-pa"
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
