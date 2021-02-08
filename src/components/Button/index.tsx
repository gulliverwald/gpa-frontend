import React from 'react';
import { Button as MUIButton, ButtonProps } from '@material-ui/core';
import { Container } from './styles';

const Button: React.FC<ButtonProps> = (props) => (
  <>
    <Container>
      <MUIButton color="primary" variant="contained" {...props} />
    </Container>
  </>
);

export default Button;
