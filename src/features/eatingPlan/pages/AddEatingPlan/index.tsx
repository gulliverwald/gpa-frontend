import React from 'react';
import {
  Paper, Accordion, AccordionSummary, AccordionDetails, Typography, IconButton,
  Table, TableHead, TableRow, TableCell, TableBody,
} from '@material-ui/core';
import {
  MdEdit, MdDelete, MdAdd, MdExpandMore,
} from 'react-icons/md';

import AppBar from '../../../../components/AppBar';

import { Container, useStyles } from './styles';

const AddEatingPlan: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar title="Plano Alimentar > Paciente: " />
      <Container>
        <h2>Paciente: </h2>

        <Paper elevation={3} className={classes.paper}>
          <h1>Plano Alimentar</h1>

          <div className="line">
            <Accordion className={classes.accordion}>
              <AccordionSummary
                expandIcon={<MdExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Café da Manhã</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Nome</b></TableCell>
                      <TableCell align="left"><b>Medida Caseira</b></TableCell>
                      <TableCell align="left"><b>Substituição</b></TableCell>
                      <TableCell align="center" />
                      <TableCell align="center" />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="left">Omelete</TableCell>
                      <TableCell align="left">2 unidades</TableCell>
                      <TableCell align="left">Ovo cozido (2 unidades), frango desfiado (2 col. de sopa)</TableCell>
                      <TableCell align="center"><IconButton><MdEdit size={30} color="purple" /></IconButton></TableCell>
                      <TableCell align="center"><IconButton><MdDelete size={30} color="red" /></IconButton></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionDetails>
            </Accordion>
            <IconButton><MdDelete size={30} color="red" /></IconButton>
          </div>

          <div className="new-meal">
            <button type="button">
              <MdAdd size={30} color="black" />
              <span>Adicionar nova refeição</span>
            </button>
          </div>
        </Paper>
      </Container>
    </>
  );
};

export default AddEatingPlan;
