import React, { ChangeEvent, MouseEvent, useMemo, useState } from 'react';

import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Table as MUITable,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
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
    return (a, b) => {
        const compResult = descendingComparator(a, b, orderBy);
        return order === 'desc' ? compResult : -compResult;
    };
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const indexedArray: [T, number][] = array.map((el, index) => [el, index]);
    indexedArray.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return indexedArray.map((el) => el[0]);
}

interface TableProps {
    rows: IList[];
}

interface ROption {
    key: string;
    value: string;
    desc: string;
}

const roleOptions: ROption[] = [
    {
        key: 'admin',
        value: 'Admin',
        desc: 'Can manage org. members, edit settings and billing. can create workspaces and brand kits.',
    },
    {
        key: 'editor',
        value: 'Editor',
        desc: 'Cannot manage org. members create workspaces.Can use brand brand kits, but not create.',
    },
    {
        key: 'viewer',
        value: 'Viewer',
        desc: 'Can view workspaces and brand kits, but not create. Role exclusive for Enterprise customers.',
    },
];

const Table = (props: TableProps) => {
    const { rows } = props;
    const [list, setList] = useState(rows);
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

    const visibleRows = useMemo(
        () =>
            stableSort(list, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

    const stringToColor = (string: string) => {
        const hash = Array.from(string).reduce((acc, char) => {
            return char.charCodeAt(0) + ((acc << 5) - acc);
        }, 0);
        const color = Array.from({ length: 3 }, (_, i) => {
            const value = (hash >> (i * 8)) & 0xff;
            return `00${value.toString(16)}`.slice(-2);
        }).join('');

        return `#${color}`;
    };

    const stringAvatar = (name: string) => {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    };

    const [open, setOpen] = useState(false);
    const [updateRow, setUpdateRow] = useState('-1');
    const [updateStatus, setUpdateStatus] = useState('-1');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseChange = () => {
        const index = rows.findIndex((obj) => {
            return obj.id === updateRow;
        });
        rows[index].status = updateStatus === 'activate' ? 'Active' : 'Inactive';
        rows[index].role = updateStatus === 'activate' ? 'viewer' : 'N/A';
        setList(rows);
        setOpen(false);
    };

    const onSelectChange = (event: SelectChangeEvent<string>) => {
        setUpdateRow(event.target.name);
        setUpdateStatus(event.target.value);
        if (event.target.value === 'activate' || event.target.value === 'deactivate') {
            handleClickOpen();
        } else {
            const index = rows.findIndex((obj) => {
                return obj.id === event.target.name;
            });
            rows[index].role = event.target.value;
        }
    };

    const popupMessage = () => {
        const action = updateStatus === 'activate' ? 'activated' : 'deactivated';
        return `The member is now ${action}.`;
    };

    type RoleKey = 'admin' | 'editor' | 'viewer' | 'activate';

    const roles: { [key in RoleKey]: string } = {
        admin: 'Admin',
        editor: 'Editor',
        viewer: 'Viewer',
        activate: 'Viewer',
    };

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
                                    <TableRow hover key={row.id}>
                                        <TableCell key="name">
                                            <ListItem alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar {...stringAvatar(row.name)} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={row.name}
                                                    secondary={row.email}
                                                />
                                            </ListItem>
                                        </TableCell>
                                        <TableCell key="status">{row.status}</TableCell>
                                        <TableCell key="role">
                                            <FormControl fullWidth>
                                                <Select
                                                    id="role-select"
                                                    name={row.id}
                                                    defaultValue={row.role}
                                                    displayEmpty
                                                    onChange={onSelectChange}
                                                    renderValue={(p) => {
                                                        if (row.status === 'Inactive') {
                                                            return 'N/A';
                                                        }
                                                        return roles[p as RoleKey] || 'N/A';
                                                    }}
                                                    sx={{
                                                        width: '120px',
                                                    }}
                                                >
                                                    {roleOptions.map((option) => (
                                                        <MenuItem
                                                            key={option.key}
                                                            value={option.key}
                                                        >
                                                            <ListItemText
                                                                primary={option.value}
                                                                secondary={option.desc}
                                                                sx={{
                                                                    width: '350px',
                                                                    whiteSpace: 'normal',
                                                                }}
                                                            />
                                                        </MenuItem>
                                                    ))}
                                                    <MenuItem
                                                        value={
                                                            row.status === 'Active'
                                                                ? 'deactivate'
                                                                : 'activate'
                                                        }
                                                    >
                                                        {row.status === 'Active'
                                                            ? 'Deactivate'
                                                            : 'Activate'}
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </MUITable>
                </TableContainer>
                <Dialog open={open} onClose={handleClose}>
                    <DialogContent>
                        <Typography>{popupMessage()}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseChange} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
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
