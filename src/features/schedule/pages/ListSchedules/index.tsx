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
    if (id !== undefined && patientId !== parseInt(id, 10)) {
      dispatch(requestListSchedules({
        patientId: parseInt(id, 10),
        callback: (data, error) => {
          setLoading(false);
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
      <AppBar title={`Listar Agendamentos do Paciente ${(patient && patient.name) || ''}`} backButton={false} />
      <MainContainer>
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
                type: 'date',
                props: ['observation'],
                orderable: false,
              },
            ]}
            size="small"
            rows={schedules}
            rowActions={[
              {
                renderItem: (row) => (
                  <Link to={`/admin/schedules/${row.id}`}>
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
