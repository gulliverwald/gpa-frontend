import React from 'react';
import { useHistory } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { Container, ButtonAppbar, useStyles } from './styles';

import ImgGPA from '../../assets/img/logo.png';

const PatientAppbar: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      <Container>
        <ButtonAppbar
          onClick={() => history.goBack()}
          className={classes.returnAppbar}
        >
          <MdArrowBack size={28} />
          <b>Voltar</b>
        </ButtonAppbar>
        <div className={classes.imageContainer}>
          <img src={ImgGPA} alt="Logo GPA" className={classes.imageGPA} />
        </div>
      </Container>
    </>
  );
};

export default PatientAppbar;
