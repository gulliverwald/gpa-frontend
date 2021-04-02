import React from 'react';
import ImgGPA from '../../../../../assets/img/logo.png';
import {
  Container, useStyles,
} from './styles';

const NutritionistDash: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Container>
        <img
          src={ImgGPA}
          alt="Logo GPA"
        />
        <h1>
          <span>Bem</span>
          -vinda(o)!
        </h1>
      </Container>
    </>
  );
};

export default NutritionistDash;
