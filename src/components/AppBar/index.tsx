/* eslint-disable react/prop-types */
import React from 'react';
import {
  AppBar as MUIAppBar,
  AppBarProps as MUIAppBarProps,
} from '@material-ui/core';
import { MdArrowBack } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { Container, ButtonAppbar, useStyles } from './styles';

interface AppBarProps extends MUIAppBarProps {
  title: string;
}

const AppBar: React.FC<AppBarProps> = ({ title }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Container>
        <MUIAppBar className={classes.appbar}>
          <p>
            <b>{title}</b>
          </p>
          <ButtonAppbar
            onClick={() => history.goBack()}
            className={classes.returnAppbar}
          >
            <MdArrowBack size={20} />
            Voltar
          </ButtonAppbar>
        </MUIAppBar>
      </Container>
    </>
  );
};

export default AppBar;
