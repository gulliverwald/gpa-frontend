/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { Button, Card, Modal } from '@material-ui/core';
import React from 'react';

import { useStyles } from './styles';

export interface IProps {
  handleConfirm: VoidFunction;
  handleCancel: VoidFunction;
  message: string;
  open: boolean;
}

const ConfirmModal: React.FC<IProps> = ({
  handleConfirm,
  handleCancel,
  message,
  open,
}) => {
  const classes = useStyles();

  return (
    <Modal
      className={classes.deleteConfirmationModal}
      open={open}
      onClose={handleCancel}
    >
      <Card className={classes.deleteConfirmationCard}>
        <p className={classes.alertText}>{message}</p>
        <div className={classes.buttonCardContainer}>
          <Button
            variant="contained"
            onClick={handleCancel}
            className={classes.button}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleConfirm}
          >
            Confirmar
          </Button>
        </div>
      </Card>
    </Modal>
  );
};

export default ConfirmModal;
