import React from 'react';

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

import IList from '@/interfaces/List';
import { memberTableColumns } from '@/pages/CompanyMembersPage/CompanyMembersColumns';

type Order = 'asc' | 'desc';
interface ITableHeadProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IList) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

const ListTableHead = (props: ITableHeadProps) => {
    const { order, orderBy, onRequestSort, rowCount } = props;
    const createSortHandler = (property: keyof IList) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <Typography variant="subtitle2">ORGANIZATION MEMBERS {`(${rowCount})`}</Typography>
            </TableRow>
            <TableRow>
                {memberTableColumns.map((column) => (
                    <TableCell
                        key={column.id}
                        align={column.numeric ? 'right' : 'left'}
                        padding={column.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === column.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === column.id}
                            direction={orderBy === column.id ? order : 'asc'}
                            onClick={createSortHandler(column.id)}
                        >
                            {column.label}
                            {orderBy === column.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};
export default ListTableHead;
