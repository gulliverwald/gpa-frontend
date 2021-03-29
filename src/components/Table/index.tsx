import React, {
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';

import {
  CircularProgress,
  Container,
  TableContainer,
  Table as MUITable,
  TablePagination,
  TableBody,
  TableRow,
  TableHead,
  Checkbox,
  TableCell as MUITableCell,
  Toolbar,
  Typography,
  TableSortLabel,
} from '@material-ui/core';
import clsx from 'clsx';
import { Pagination } from '@material-ui/lab';
import {
  DefaultRowProps,
  IRow,
  IRowAction,
  ITableProps,
  IInputRef,
} from './types';
import TableCell from './TableCell';

import { useToolbarStyles } from './styles';

function Table<T extends DefaultRowProps>(
  {
    columns,
    rowActions,
    actions,
    size,
    onChangeSort,
    defaultOrderBy,
    rows,
    hidePagination = false,
    selectBox = false,
    loading,
    defaultPage = 0,
  }: React.PropsWithChildren<ITableProps<T>>,
  ref: React.Ref<IInputRef<T>>,
// eslint-disable-next-line no-undef
): JSX.Element {
  const [page, setPage] = useState<number>(defaultPage);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<keyof T | undefined>(defaultOrderBy);
  const [selectedRows, setSelectedRows] = useState<IRow<T>[]>([] as IRow<T>[]);

  const classes = useToolbarStyles();

  useImperativeHandle(ref, () => ({
    rowsPerPage,
    order,
    orderBy,
    page,
    clearSelectedRows() {
      setSelectedRows([]);
    },
    // eslint-disable-next-line no-shadow
    setPage(page: number) {
      setPage(page);
    },
  }));

  const dynamicSort = useCallback((prop: string) => {
    let sortOrder = 1;
    let property = prop;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (a: any, b: any) => {
      let result = 0;
      const valueA = a[property] ? a[property] : 0;
      const valueB = b[property] ? b[property] : 0;
      if (valueA < valueB) {
        result = -1;
      }
      if (valueA > valueB) {
        result = 1;
      }
      return result * sortOrder;
    };
  }, []);

  const handleChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
      setSelectedRows([]);
    },
    [],
  );

  const handleSelect = (row: IRow<T>) => {
    const selectedIndex = selectedRows.indexOf(row);
    let newSelected: IRow<T>[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selectedRows, row];
    } else if (selectedIndex === 0) {
      newSelected = [...selectedRows.slice(1)];
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = [...selectedRows.slice(0, -1)];
    } else if (selectedIndex > 0) {
      newSelected = [
        ...selectedRows.slice(0, selectedIndex),
        ...selectedRows.slice(selectedIndex + 1),
      ];
    }

    setSelectedRows(newSelected);
  };

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
      setSelectedRows([]);
    },
    [],
  );

  const handleSelectAllClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelected = rows.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
        );
        setSelectedRows(newSelected);
        return;
      }
      setSelectedRows([]);
    },
    [page, rowsPerPage, rows],
  );

  const handleRequestSort = useCallback(
    (property: keyof T) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
      setSelectedRows([]);
      if (onChangeSort) onChangeSort(property, isAsc ? 'desc' : 'asc');
    },
    [onChangeSort, order, orderBy],
  );

  const pageRowsNumber = useMemo(
    () => rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length,
    [page, rowsPerPage, rows],
  );

  return (
    <>
      {selectBox && actions && actions?.length > 0 && (
        <Toolbar
          className={clsx(classes.root, {
            [classes.highlight]: selectedRows.length > 0,
          })}
        >
          {selectedRows.length > 0 && (
            <>
              <Typography
                className={classes.title}
                color="textSecondary"
                variant="subtitle1"
                component="div"
              >
                {selectedRows.length}
                {' '}
                selecionadas
              </Typography>
              {actions?.map((action) => action.renderItem(selectedRows))}
            </>
          )}
        </Toolbar>
      )}
      <TableContainer>
        {!loading ? (
          <MUITable
            aria-labelledby="tableTitle"
            size={size}
            aria-label="enhanced table"
          >
            <TableHead>
              <TableRow>
                {selectBox && (
                  <MUITableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      indeterminate={
                        selectedRows.length > 0
                        && selectedRows.length < pageRowsNumber
                      }
                      checked={
                        rows.length > 0
                        && selectedRows.length === pageRowsNumber
                      }
                      onChange={handleSelectAllClick}
                      inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                  </MUITableCell>
                )}
                {columns.map((column) => (
                  <MUITableCell
                    key={column.title}
                    align={column.type === 'number' ? 'right' : 'left'}
                    sortDirection={orderBy === column.props[0] ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === column.props[0]}
                      direction={orderBy === column.props[0] ? order : 'asc'}
                      onClick={() => handleRequestSort(column.props[0])}
                    >
                      {column.title}
                    </TableSortLabel>
                  </MUITableCell>
                ))}
                {!!rowActions && !!rowActions.length && (
                  <MUITableCell key="actions" align="right" />
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length ? (
                rows
                  .slice()
                  .sort(dynamicSort(`${order === 'desc' ? '-' : ''}${orderBy}`))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = selectedRows.includes(row);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        // onClick={() => handleSelect(row)}
                        key={row.id || Math.random()}
                        selected={isItemSelected}
                        tabIndex={index}
                      >
                        {selectBox && (
                          <MUITableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              onChange={() => handleSelect(row)}
                              checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </MUITableCell>
                        )}
                        {columns.map((column, index_) => (
                          <TableCell
                            // eslint-disable-next-line react/no-array-index-key
                            key={index_ + index}
                            align={column.type === 'number' ? 'right' : 'left'}
                            column={column}
                            index={index}
                            row={row}
                          />
                        ))}

                        {!!rowActions && !!rowActions.length ? (
                          <MUITableCell align="right">
                            {rowActions.map(
                              (action: IRowAction<T>) => action.renderItem(row, index),
                            )}
                          </MUITableCell>
                        ) : null}
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <MUITableCell colSpan={100} align="center">
                    <Container className={classes.emptyTableContainer}>
                      Sem dados
                    </Container>
                  </MUITableCell>
                </TableRow>
              )}
            </TableBody>
          </MUITable>
        ) : (
          <Container className={classes.container}>
            <CircularProgress color="primary" />
          </Container>
        )}
      </TableContainer>
      {!loading && rows.length > 0 && !hidePagination ? (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="Items por página"
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      ) : null}
    </>
  );
}

export default memo(React.forwardRef(Table)) as typeof Table;
// export default React.forwardRef(Table) as typeof Table;
