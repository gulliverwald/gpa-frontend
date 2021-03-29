import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  Paper, Accordion, AccordionSummary, AccordionDetails, Typography, IconButton,
  Table, TableHead, TableRow, TableCell, TableBody,
} from '@material-ui/core';
import {
  MdEdit, MdDelete, MdAdd, MdExpandMore,
} from 'react-icons/md';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import AppBar from '../../../../components/AppBar';
import BackdropLoading from '../../../../components/BackdropLoading';

import { Container, useStyles } from './styles';

const AddEatingPlan: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const {
    register, errors, handleSubmit,
  } = useForm();

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
              <AccordionDetails className={classes.accordionDetail}>
                <div className={classes.foodTitle}>
                  <h2><b>Alimento(s)</b></h2>
                  <Button variant="outlined">Adicionar Alimento</Button>
                </div>
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
                <Input
                  defaultValue=""
                  inputRef={register({ required: true })}
                  required
                  id="observations"
                  name="observations"
                  label="Observação"
                  variant="outlined"
                  autoComplete="off"
                  rows={3}
                  multiline
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.input}
                />
                <Input
                  defaultValue="Café da Manhã"
                  inputRef={register({ required: true })}
                  required
                  id="name"
                  name="name"
                  label="Nome da Refeição"
                  variant="outlined"
                  autoComplete="off"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.input}
                  helperText="Caso queira editá-la, digite o novo nome acima."
                />
                <Button type="submit">Salvar</Button>
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
      <BackdropLoading open={loading} />
    </>
  );
};

export default AddEatingPlan;
