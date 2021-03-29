/* eslint-disable react/prop-types */
import React from 'react';
import { Controller } from 'react-hook-form';
import {
  Select as SelectMUI,
  FormControl,
  FormControlProps,
  InputLabel,
  SelectProps as SelectPropsMUI,
  MenuItem,
} from '@material-ui/core';

import { useStyles } from './styles';

interface SelectProps {
  name: string;
  required?: boolean;
  id?: string;
  label?: string;
  control?: any;
  defaultValue?: any;
  loading?: boolean;
  selectProps?: SelectPropsMUI;
}

const Select: React.FC<SelectProps> = ({
  id,
  name,
  required,
  label,
  control,
  defaultValue,
  loading = false,
  children,
  selectProps,
  ...props
}) => {
  const classes = useStyles();
  const labelId = `${name}-label`;

  return (
    <FormControl variant="outlined" {...props} className={classes.formControl}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        as={(
          <SelectMUI {...selectProps} labelId={labelId} label={label}>
            {!loading ? (
              children
            ) : (
              <MenuItem
                key={Math.random()}
                value={1}
                disabled
                className={classes.loadingItem}
              >
                Carregando...
              </MenuItem>
            )}
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
