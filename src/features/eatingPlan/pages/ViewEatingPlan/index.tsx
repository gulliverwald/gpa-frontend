import React from 'react';
import { useSelector } from 'react-redux';

import {
  Paper, Accordion, AccordionSummary, AccordionDetails, Typography,
  Table, TableHead, TableRow, TableCell, TableBody,
} from '@material-ui/core';

import { MdExpandMore } from 'react-icons/md';

import { WebStore } from '../../../../store/RootReducer';
import PatientAppbar from '../../../../components/PatientAppbar';
import { Container, BoxContainer, useStyles } from './styles';

const EatingPlan: React.FC = () => {
  const user = useSelector((store: WebStore) => store.user.state.userInfo.user);
  const classes = useStyles();

  return (
    <>
      <PatientAppbar />
      <Container>
        <BoxContainer>
          {/* <p>PLANO ALIMENTAR</p> */}
          <h1>
            <b>
              Dados Antropométricos:
            </b>
            {' '}
            {user.name}
          </h1>
          <div className="antropo-data">
            <div>
              <span>Altura: obj m</span>
              <span>Peso: obj kg</span>
              <span>IMC: obj kg/m²</span>
              <span>Gordura visceral: obj</span>
              <span>Idade metabólica: obj anos</span>
            </div>
            <div>
              <span>
                <b>Percentual de Gordura</b>
                <span>Bioimpedância</span>
                <span>Somatório de Pregas</span>
              </span>
              <span>
                <b>Percentual de Massa Muscular</b>
                <span>obj</span>
              </span>
            </div>
            <div>
              <span>
                <b>Circunferência do braço</b>
                <span>obj mm</span>
              </span>
              <span>
                <b>Circunferência da cintura</b>
                <span>obj mm</span>
              </span>
            </div>
            <div>
              <span>
                <b>Prega cutânea</b>
                <span>Bicipital</span>
                <span>Tricipital</span>
              </span>
              <span>Supra ilíaca: obj mm</span>
              <span>Supra escapular: anos mm</span>
            </div>
          </div>

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
                    <h4><b>Alimento(s)</b></h4>
                  </div>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><b>Nome</b></TableCell>
                        <TableCell align="left"><b>Medida Caseira</b></TableCell>
                        <TableCell align="left"><b>Substituição</b></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="left">Omelete</TableCell>
                        <TableCell align="left">2 unidades</TableCell>
                        <TableCell align="left">Ovo cozido (2 unidades), frango desfiado (2 col. de sopa)</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Typography variant="subtitle2" color="textSecondary" style={{ paddingTop: '16px' }}>
                    Observações: Fazer o Omelete com dois ovos e adicionar a aveia e
                    banana cortadas em rodelas depois de pronta,
                    se preferir colocar uma colher de canela e uma de mel.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </Paper>
        </BoxContainer>
      </Container>
    </>
  );
};

export default EatingPlan;
