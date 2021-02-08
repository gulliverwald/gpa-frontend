/* eslint-disable camelcase */
import React, { useEffect, useState, useMemo } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Checkbox,
} from '@material-ui/core';
import { MdEdit, MdDelete } from 'react-icons/md';
import AppBar from '../../../../../components/AppBar';
import {
  Container, MainContainer, useStyles,
} from './styles';
import api from '../../../../../services/api';

interface Patient{
  id: string;
  nome: string;
  data_nascimento: string;
  email: string;
  telefone: string;
  hasAccess: boolean;
}

const ListPatient: React.FC = () => {
  const classes = useStyles();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTIzNTY5MTIsImV4cCI6MTYxMjQ0MzMxMiwic3ViIjoiMSJ9.LGujUx7jj2OPvWMQegEKLsu_n6_OUKiggtM2-3hhrtQ';
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    async function handleListPatients(): Promise<void> {
      const response = await api.get('/Users', config);
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
      <AppBar />
      <MainContainer>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} size="small" aria-label="a dense table">
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
          </Table>
        </TableContainer>
      </MainContainer>
    </Container>
  );
};

export default ListPatient;
