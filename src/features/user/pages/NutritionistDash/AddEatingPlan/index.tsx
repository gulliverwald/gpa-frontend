import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar } from '@material-ui/core';
import { MdArrowBack } from 'react-icons/md';
import { Container, Button, useStyles } from './styles';

const AddEatingPlan: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container>
      <AppBar className={classes.appbar}>
        <p><b>Adicionar Plano Alimentar</b></p>
        <Button onClick={() => history.goBack()} className={classes.returnAppbar}>
          <MdArrowBack size={20} />
          Voltar
        </Button>
      </AppBar>
    </Container>
  );
};

export default AddEatingPlan;
