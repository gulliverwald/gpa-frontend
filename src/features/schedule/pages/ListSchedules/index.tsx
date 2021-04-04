import React, { useEffect, useState } from 'react';
import {
  TableContainer,
  Paper,
  Icon,
} from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import { MdVisibility } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, MainContainer, useStyles,
} from './styles';
import AppBar from '../../../../components/AppBar';
import BackdropLoading from '../../../../components/BackdropLoading';
import Table from '../../../../components/Table';
import Button from '../../../../components/Button';
import IconButton from '../../../../components/IconButton';
import CheckBoolean from '../../../../components/CheckBoolean';
import { WebStore } from '../../../../store/RootReducer';
import { ISchedulesInfo } from '../../redux/types/ISchedulesState';
import { requestListSchedules } from '../../redux/reducers/schedulesReducer';
import { addNotification } from '../../../../hooks/toast/redux/reducers/NotificationReducer';
import api from '../../../../services/api';
import { IPatientsInfo } from '../../../patient/redux/types/IPatientsState';

export default function ListSchedules() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const schedules = useSelector((state: WebStore) => state.schedule.schedules);
  const patientId = useSelector((state: WebStore) => state.schedule.patientId);
  const [patient, setPatient] = useState<IPatientsInfo | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    console.log(patientId);
    console.log(id);
    if (id !== undefined && patientId !== parseInt(id, 10)) {
      dispatch(requestListSchedules({
        patientId: parseInt(id, 10),
        callback: (data, error) => {
          setLoading(false);
          console.log('buscou', data);
          if (error) {
            dispatch(addNotification({
              message: 'Erro ao buscar agendamentos do paciente',
              key: Math.random(),
              options: {
                variant: 'error',
              },
            }));
          }
        },
      }));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    if (id !== undefined) {
      api.get(`/users/${id}`).then((response) => {
        if (response.data.id) {
          setPatient(response.data);
        }
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <Container>
      <BackdropLoading open={loading} />
      <AppBar title={`Lista de consultas do paciente: ${(patient && patient.name) || ''}`} backButton />
      <MainContainer>
        <div className="container-button">
          <Link to={(location) => `${location.pathname}/addSchedule`} className={classes.link}>
            <Button>Adicionar uma nova consulta</Button>
          </Link>
        </div>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table<ISchedulesInfo>
            columns={[
              {
                title: 'Data',
                type: 'date',
                props: ['date'],
                orderable: true,
              },
              {
                title: 'Observações',
                type: 'string',
                props: ['observation'],
                orderable: false,
              },
            ]}
            size="small"
            rows={loading ? [] : schedules}
            rowActions={[
              {
                renderItem: (row) => (
                  <Link to={`/admin/updateSchedule/${row.patient_id}/${row.id}`}>
                    <IconButton
                      Icon={MdVisibility}
                      color="default"
                      size="medium"
                    />
                  </Link>
                ),
              },
            ]}
            defaultOrderBy="date"
          />
        </TableContainer>
      </MainContainer>
    </Container>
  );
}
