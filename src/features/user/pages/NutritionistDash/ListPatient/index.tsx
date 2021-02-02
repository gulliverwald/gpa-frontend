import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  AppBar,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Checkbox,
} from '@material-ui/core';
import { MdArrowBack, MdEdit, MdDelete } from 'react-icons/md';
import {
  Container, ButtonAppbar, MainContainer, useStyles,
} from './styles';
import api from '../../../../../services/api';

interface Patient{
  name: string;
  age: string;
  email: string;
  phone: string;
  hasAccess: boolean;
}

const ListPatient: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    async function handleListPatients(): Promise<void> {
      const response = await api.get('/patients');
      setPatients(response.data);
    }
    handleListPatients();
  }, [patients]);

  return (
    <Container>
      <AppBar className={classes.appbar}>
        <p><b>Lista de Pacientes</b></p>
        <ButtonAppbar onClick={() => history.goBack()} className={classes.returnAppbar}>
          <MdArrowBack size={20} />
          Voltar
        </ButtonAppbar>
      </AppBar>
      <MainContainer>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="right">Idade</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Telefone</TableCell>
                <TableCell align="center">Acesso</TableCell>
                <TableCell align="center" />
                <TableCell align="center" />
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.name}>
                  <TableCell component="th" scope="row">
                    {patient.name}
                  </TableCell>
                  <TableCell align="right">{patient.age}</TableCell>
                  <TableCell align="right">{patient.email}</TableCell>
                  <TableCell align="right">{patient.phone}</TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      color="primary"
                      inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                    />
                  </TableCell>
                  <TableCell align="center"><MdEdit color="purple" /></TableCell>
                  <TableCell align="center"><MdDelete color="red" /></TableCell>
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
