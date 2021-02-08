/* eslint-disable react/prop-types */
import React, { ComponentType } from 'react';
import { IconBaseProps } from 'react-icons/lib';
// import { NavLink } from 'react-router-dom';
import { Container, Button, useStyles } from './styles';

interface CardPatientProps {
  Icon: ComponentType<IconBaseProps>;
  message: string;
}

const CardPatient: React.FC<CardPatientProps> = ({ Icon, message }) => {
  const classes = useStyles();

  return (
    <>
      <Button>
        <Container>
          <div className={classes.iconContainer}>
            <Icon size={28} color="white" />
          </div>
          <b>{message}</b>
        </Container>
      </Button>
    </>
  );
};

export default CardPatient;
