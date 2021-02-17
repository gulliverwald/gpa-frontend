/* eslint-disable camelcase */
import React, { useEffect, useState, useMemo } from 'react';
import {
  TableContainer,
  Paper,
} from '@material-ui/core';
import { MdDelete, MdEdit } from 'react-icons/md';
import AppBar from '../../../../components/AppBar';
import Table from '../../../../components/Table';
import api from '../../../../services/api';
import {
  Container, MainContainer, useStyles,
} from './styles';

interface PatientProps{
  id: string;
  name: string;
  birthday: string;
  email: string;
  phone: string;
  access_authorization: boolean;
}

const ListPatient: React.FC = () => {
  const classes = useStyles();
  const [patients, setPatients] = useState<PatientProps[]>([]);

  useEffect(() => {
    async function handleListPatients(): Promise<void> {
      const response = await api.get('/Users');
      setPatients(response.data);
    }
    handleListPatients();
  }, [patients]);

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
      <AppBar title="Listar pacientes" />
      <MainContainer>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table<PatientProps>
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
            ]}
            rows={patients}
            rowActions={[
              {
                renderItem: () => (<MdEdit color="purple" size={28} />),
              },
              {
                renderItem: () => (<MdDelete color="red" size={28} />),
              },
            ]}
            selectBox
            actions={[
              {
                renderItem: () => (<MdDelete size={28} />),
              },
            ]}
            defaultOrderBy="name"
          />

          {/* <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="left">Idade</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Telefone</TableCell>
                <TableCell align="center" width={16}>Acesso</TableCell>
                <TableCell align="center" width={16} />
                <TableCell align="center" width={16} />
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell component="th" scope="row">
                    {patient.nome}
                  </TableCell>
                  <TableCell align="left">{getAge(patient.data_nascimento)}</TableCell>
                  <TableCell align="left">{patient.email}</TableCell>
                  <TableCell align="left">{patient.telefone}</TableCell>
                  <TableCell align="center">
                    <Checkbox
                      key={patient.id}
                      checked={checked}
                      onChange={handleChange}
                      color="primary"
                      inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                    />
                  </TableCell>
                  <TableCell align="center"><MdEdit color="purple" size={26} /></TableCell>
                  <TableCell align="center"><MdDelete color="red" size={26} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> */}
        </TableContainer>
      </MainContainer>
    </Container>
  );
};

export default ListPatient;
