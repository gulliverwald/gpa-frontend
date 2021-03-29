/* eslint-disable react/prop-types */
import React from 'react';

import {
  FormControlLabel,
  FormControlLabelProps,
  Switch as MUISwitch,
  SwitchProps as MUISwitchProps,
} from '@material-ui/core';

interface Props extends Omit<FormControlLabelProps, 'control'> {
  switchProps?: MUISwitchProps;
}

const Switch: React.FC<Props> = ({ switchProps, ...props }) => (
  <FormControlLabel
    {...props}
    control={<MUISwitch {...switchProps} color="primary" />}
    color="primary"
  />
);

export default Switch;
