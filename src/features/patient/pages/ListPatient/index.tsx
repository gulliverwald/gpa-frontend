/* eslint-disable camelcase */
import React, {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import {
  TableContainer,
  Paper,
  Icon,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  MdCheckCircle, MdDelete, MdEdit, MdRadioButtonUnchecked,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '../../../../components/AppBar';
import Table from '../../../../components/Table';
import api from '../../../../services/api';
import {
  Container, MainContainer, useStyles,
} from './styles';
import BackdropLoading from '../../../../components/BackdropLoading';
import IconButton from '../../../../components/IconButton';
import { requestDeletePatients, requestListPatients } from '../../redux/reducers/patientsReducer';
import { IPatientsInfo } from '../../redux/types/IPatientsState';
import ConfirmModal from '../../../../components/Modal';
import { addNotification } from '../../../../hooks/toast/redux/reducers/NotificationReducer';
import { WebStore } from '../../../../store/RootReducer';
import Tooltip from '../../../../components/Tooltip';
import CheckBoolean from '../../../../components/CheckBoolean';

interface PatientProps {
  id: number;
  name: string;
  birthday: string;
  email: string;
  phone: string;
  access_authorization: boolean;
}

const ListPatient: React.FC = () => {
  const classes = useStyles();
  const patients = useSelector((state: WebStore) => state.patient.patients);
  const [loading, setLoading] = useState(false);
  const [toDeletePatient, setToDeletePatient] = useState<IPatientsInfo | null>(null);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(requestListPatients({
      callback: (data, error) => {
        setLoading(false);
        if (error) {
          dispatch(addNotification({
            key: Math.random(),
            message: 'Ocorreu um erro ao listar os pacientes, tente novamente',
            options: {
              variant: 'error',
            },
          }));
        }
      },
    }));
  }, []);

  const handleCancel = useCallback(
    () => {
      setToDeletePatient(null);
      setOpenConfirmModal(false);
    },
    [],
  );

  const handleConfirm = useCallback(
    () => {
      setLoading(true);
      if (toDeletePatient) {
        dispatch(requestDeletePatients({
          id: toDeletePatient.id,
          callback: (data, error) => {
            setLoading(false);
            if (data) {
              dispatch(addNotification({
                message: 'Paciente deletado',
                key: Math.random(),
                options: {
                  variant: 'success',
                },
              }));
            }
            if (error) {
              dispatch(addNotification({
                message: 'Erro ao deletar paciente',
                key: Math.random(),
                options: {
                  variant: 'error',
                },
              }));
            }
          },
        }));
      }
      setOpenConfirmModal(false);
      setToDeletePatient(null);
    },
    [toDeletePatient],
  );

  const getAge = useMemo(() => (dateString: string) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age -= 1;
    }
    return age;
  }, [patients]);

  return (
    <Container>
      <BackdropLoading open={loading} />
      <AppBar title="Listar pacientes" backButton={false} />
      <MainContainer>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table<IPatientsInfo>
            columns={[
              {
                title: 'Nome',
                type: 'string',
                props: ['name'],
                orderable: true,
              },
              {
                title: 'Idade',
                type: 'number',
                props: ['birthday'],
                formatter: (patient) => getAge(patient.birthday).toString(),
                orderable: true,
              },
              {
                title: 'Email',
                type: 'string',
                props: ['email'],
                orderable: true,
              },
              {
                title: 'Telefone',
                type: 'string',
                props: ['phone'],
                orderable: false,
              },
              {
                title: 'Acesso',
                type: 'boolean',
                props: ['access_authorization'],
                orderable: false,
                renderItem: (row) => (
                  <CheckBoolean
                    checked={!!row.access_authorization}
                    title={row.access_authorization ? 'Liberado' : 'Não liberado'}
                  />
                ),
              },
            ]}
            size="small"
            rows={patients}
            rowActions={[
              {
                renderItem: (row) => (
                  <Link to={`/admin/editPatient/${row.id}`}>
                    <IconButton
                      Icon={MdEdit}
                      color="primary"
                      size="medium"
                    />
                  </Link>
                ),
              },
              {
                renderItem: (row) => (
                  <IconButton
                    onClick={() => {
                      setToDeletePatient(row);
                      setOpenConfirmModal(true);
                    }}
                    Icon={MdDelete}
                    color="secondary"
                    size="medium"
                  />
                ),
              },
            ]}
            defaultOrderBy="name"
          />
        </TableContainer>
      </MainContainer>
      <ConfirmModal
        open={openConfirmModal}
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
        message="Deseja realmente deletar este paciente?"
      />
    </Container>
  );
};

export default ListPatient;
