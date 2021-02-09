import React from 'react';
import { TextField as MUITextField, TextFieldProps } from '@material-ui/core';
import { Container } from './styles';

const Input: React.FC<TextFieldProps> = props => (
  <>
    <Container>
      <MUITextField variant="outlined" autoComplete="off" {...props} />
    </Container>
  </>
);

export default Input;
