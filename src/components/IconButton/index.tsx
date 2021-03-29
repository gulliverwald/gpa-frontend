/* eslint-disable react/prop-types */
import React from 'react';
import {
  IconButton as MUIIconButton,
  IconButtonProps,
} from '@material-ui/core';
import { IconType } from 'react-icons';
import { Container } from './styles';

interface Props extends IconButtonProps {
  Icon: IconType;
}

const Button: React.FC<Props> = ({ Icon, ...props }) => (
  <MUIIconButton {...props}>
    <Icon />
  </MUIIconButton>
);

export default Button;
