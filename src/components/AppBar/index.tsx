import React from 'react';
import { AppBar as MUIAppBar, AppBarProps } from '@material-ui/core';
import { MdArrowBack } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { Container, ButtonAppbar, useStyles } from './styles';

const AppBar: React.FC<AppBarProps> = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Container>
        <MUIAppBar className={classes.appbar}>
          <p><b>Adicionar Paciente</b></p>
          <ButtonAppbar onClick={() => history.goBack()} className={classes.returnAppbar}>
            <MdArrowBack size={20} />
            Voltar
          </ButtonAppbar>
        </MUIAppBar>
      </Container>
    </>
  );
};

export default AppBar;
