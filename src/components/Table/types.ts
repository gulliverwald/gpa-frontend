import React, { CSSProperties, ReactElement } from 'react';

export type PropType = number | string;

export interface IColumn<T extends DefaultRowProps> {
  title: string;
  delimiter?: string;
  cssProps?: CSSProperties;
  formatter?: (row: IRow<T>) => string;
  orderable?: boolean;
  props: Array<keyof T>;
  filterRef?: React.MutableRefObject<HTMLInputElement | undefined>;
  type?: 'currency' | 'number' | 'date' | 'string' | 'boolean';
  renderItem?: (row: IRow<T>, index: number) => string | ReactElement;
}

export interface DefaultRowProps {
  id?: string | number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IRow<T extends DefaultRowProps = any> = T;

export type IAction<T extends DefaultRowProps> = {
  renderItem: (row: IRow<T>[]) => string | ReactElement;
};
export type IRowAction<T extends DefaultRowProps> = {
  renderItem: (row: IRow<T>, index: number) => string | ReactElement;
};

export interface ITableProps<T extends DefaultRowProps> {
  columns: Array<IColumn<T>>;
  rowActions?: Array<IRowAction<T>>;
  rows: Array<IRow<T>>;
  actions?: Array<IAction<T>>;
  loading?: boolean;
  hidePagination?: boolean;
  size?: 'small' | 'medium';
  selectBox?: boolean;
  defaultPage?: number;
  onChangeSort?: (property: keyof T, order: 'asc' | 'desc') => void;
  defaultOrderBy?: keyof T;
  ref?: React.Ref<unknown>;
}

export interface TableCellProps<T extends DefaultRowProps> {
  column: IColumn<T>;
  row: IRow<T>;
  index: number;
}

export interface IInputRef<T> {
  rowsPerPage: number;
  order: 'asc' | 'desc';
  orderBy?: keyof T;
  page: number;
  clearSelectedRows: () => void;
  setPage: (page: number) => void;
}
