import React, { ChangeEvent, MouseEvent, useMemo, useState } from 'react';

import {
    Avatar,
    FormControl,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Table as MUITable,
    MenuItem,
    Select,
} from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import IList from '@/interfaces/List';
import TableHead from '@/pages/CompanyMembersPage/TableHead/TableHead';

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

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
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

interface TableProps {
    rows: IList[];
}
const Table = (props: TableProps) => {
    const { rows } = props;
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof IList>('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event: MouseEvent<unknown>, property: keyof IList) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    const visibleRows = useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );
    const options = [
        'Can manage org. members, edit settings and billing. can create workspaces and brand kits.',
        'Cannot manage org. members create workspaces.Can use brand brand kits, but not create.',
        'Can view workspaces and brand kits, but not create. Role exclusive for Enterprise customers.',
    ];
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <MUITable sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
                        <TableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row) => {
                                return (
                                    <TableRow hover key={row.id} sx={{ cursor: 'pointer' }}>
                                        <TableCell key="name">
                                            <ListItem alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar alt={row.name} src="#" />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={row.name}
                                                    secondary={row.email}
                                                />
                                            </ListItem>
                                        </TableCell>
                                        <TableCell key="lastActive">{row.lastActive}</TableCell>
                                        <TableCell key="role">
                                            <FormControl fullWidth>
                                                <Select
                                                    id="role-select"
                                                    defaultValue={row.role}
                                                    displayEmpty
                                                    renderValue={(p) => {
                                                        let result;
                                                        if (p === 'admin') {
                                                            result = 'Admin';
                                                        } else if (p === 'editor') {
                                                            result = 'Editor';
                                                        } else {
                                                            result = 'Viewer';
                                                        }
                                                        return result;
                                                    }}
                                                    sx={{
                                                        width: '120px',
                                                    }}
                                                >
                                                    <MenuItem value="admin">
                                                        <ListItemText
                                                            primary="Admin"
                                                            secondary={options[0]}
                                                            sx={{
                                                                width: '350px',
                                                                whiteSpace: 'normal',
                                                            }}
                                                        />
                                                    </MenuItem>
                                                    <MenuItem value="editor">
                                                        <ListItemText
                                                            primary="Editor"
                                                            secondary={options[1]}
                                                            sx={{
                                                                width: '350px',
                                                                whiteSpace: 'normal',
                                                            }}
                                                        />
                                                    </MenuItem>
                                                    <MenuItem value="viewer">
                                                        <ListItemText
                                                            primary="Viewer"
                                                            secondary={options[2]}
                                                            sx={{
                                                                width: '350px',
                                                                whiteSpace: 'normal',
                                                            }}
                                                        />
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </MUITable>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};
export default Table;
