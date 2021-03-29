/* eslint-disable react/prop-types */
import React from 'react';
import { Tooltip as MUITooltip, TooltipProps } from '@material-ui/core';

const Tooltip: React.FC<TooltipProps> = ({ children, ...rest }) => (
  <MUITooltip {...rest}>{children}</MUITooltip>
);

export default Tooltip;
