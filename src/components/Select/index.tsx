/* eslint-disable react/prop-types */
import React from 'react';
import { Controller } from 'react-hook-form';
import { Select as SelectMUI, FormControl, InputLabel } from '@material-ui/core';

import { useStyles } from './styles';

interface SelectProps {
  name: string;
  required?: boolean;
  id?: string;
  label?: string;
  control?: any;
  defaultValue?: any;
}

const Select: React.FC<SelectProps> = ({
  id,
  name,
  required,
  label,
  control,
  defaultValue,
  children,
  ...props
}) => {
  const classes = useStyles();
  const labelId = `${name}-label`;

  return (
    <FormControl variant="outlined" {...props} className={classes.formControl}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        as={(
          <SelectMUI labelId={labelId} label={label}>
            {children}
          </SelectMUI>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
        required
      />
    </FormControl>
  );
};

export default Select;
