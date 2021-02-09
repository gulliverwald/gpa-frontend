/* eslint-disable no-undef */
import React from 'react';
import {
  TableCell as MUITableCell,
  TableCellProps as MUITableCellProps,
} from '@material-ui/core';
import { DefaultRowProps, TableCellProps } from './types';

function TableCell<T extends DefaultRowProps>({
  column,
  row,
  ...rest
}: React.PropsWithChildren<
  TableCellProps<T> & MUITableCellProps
>): JSX.Element {
  const rowColumnText: (string | number)[] = [];
  let formatRowColumnText;

  if (column.renderItem) {
    return (
      <MUITableCell
        {...rest}
        key={`${column.title}.${Math.random() + new Date().getTime()}`}
        style={{ ...column.cssProps }}
      >
        {column.renderItem(row)}
      </MUITableCell>
    );
  }

  if (Array.isArray(column.props)) {
    for (let i = 0; i < column.props.length; i += 1) {
      const key = column.props[i];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rowColumnText.push((row as any)[key]);
    }
  } else {
    rowColumnText.push(row[column.props]);
  }

  if (column.type === 'currency') {
    formatRowColumnText = new Intl.NumberFormat('pt-BR', {
      currency: 'BRL',
      style: 'currency',
    }).format(parseInt(rowColumnText.join(' '), 10));
  }

  if (column.type === 'date' && !!rowColumnText[0]) {
    formatRowColumnText = new Date(rowColumnText[0])
      .toISOString()
      .split('T')[0]
      .split('-')
      .slice(0, 3)
      .reverse()
      .join('/');
  }

  if (column.formatter) {
    formatRowColumnText = column.formatter(row);
  }

  return (
    <MUITableCell
      {...rest}
      key={`${column.title}.${Math.random() + new Date().getTime()}`}
      style={{ ...column.cssProps }}
    >
      {formatRowColumnText || rowColumnText.join(column.delimiter || ' ')}
    </MUITableCell>
  );
}

export default TableCell;
