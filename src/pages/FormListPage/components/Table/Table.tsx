import React, { ChangeEvent, MouseEvent, useMemo, useState } from 'react';

import { Table as MUITable } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import styled from 'styled-components';

// import { IForm } from '@/interfaces/CreateForm';
import { IFectchedForm } from '@/interfaces/CreateResponse';
import TableHead from '@/pages/FormListPage/components/Table/components/TableHead';
import TableToolbar from '@/pages/FormListPage/components/Table/components/TableToolbar';
import { formTableColumns as columns } from '@/pages/FormListPage/FormTableColumns';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof never>(
    order: Order,
    orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: IFectchedForm[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const StyledTableRow = styled(TableRow)`
    cursor: pointer;
    height: 80px;
`;

const Table = ({ forms }: { forms: IFectchedForm[] }) => {
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof IFectchedForm>('title');
    const [selected, setSelected] = useState<readonly (string | number)[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event: MouseEvent<unknown>, property: keyof IFectchedForm) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = forms.map((row) => row._id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleRowClick = (event: MouseEvent<unknown>, id: string | number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly (string | number)[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const isSelected = (id: string | number) => selected.indexOf(id) !== -1;
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - forms.length) : 0;
    const visibleRows = useMemo(
        () =>
            stableSort(forms, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, forms],
    );
    return (
        <div>
            <TableToolbar numSelected={selected.length} />
            <MUITable aria-labelledby="tableTitle" size="medium">
                <TableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={forms.length}
                />
                <TableBody>
                    {visibleRows.map((row, index) => {
                        const isItemSelected = isSelected(row._id);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                            <StyledTableRow
                                hover
                                onClick={(event) => handleRowClick(event, row._id)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row._id}
                                selected={isItemSelected}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        checked={isItemSelected}
                                        inputProps={{
                                            'aria-labelledby': labelId,
                                        }}
                                    />
                                </TableCell>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={value} align="left">
                                            {value}
                                        </TableCell>
                                    );
                                })}
                            </StyledTableRow>
                        );
                    })}
                    {emptyRows > 0 && (
                        <StyledTableRow>
                            <TableCell />
                        </StyledTableRow>
                    )}
                </TableBody>
            </MUITable>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={forms.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};
export default Table;
