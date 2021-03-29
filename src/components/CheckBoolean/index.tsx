/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import { MdCheckCircle, MdRadioButtonUnchecked } from 'react-icons/md';
import Tooltip from '../Tooltip';
import { useStyles } from './styles';

interface IProps {
  checked: boolean;
  title: string;
}

const CheckBoolean: React.FC<IProps> = ({ checked = false, title }) => {
  const classes = useStyles();
  return (
    <Tooltip
      title={title}
    >
      {
        checked ? (
          <MdCheckCircle size={24} color="primary" />
        ) : (
          <MdRadioButtonUnchecked size={24} color="primary" />
        )
      }
    </Tooltip>
  );
};

export default CheckBoolean;
