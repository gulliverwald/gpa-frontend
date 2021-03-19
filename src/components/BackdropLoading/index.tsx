/* eslint-disable react/prop-types */
import { Backdrop, CircularProgress } from '@material-ui/core';
import React from 'react';
import { useStyles } from './styles';

interface IProps {
  open: boolean;
}

const BackdropLoading: React.FC<IProps> = ({ open }) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackdropLoading;
