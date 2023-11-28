import React from 'react';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import HeaderCell from './components/HeaderCell';
import IColumn from '@/components/Table/interfaces/IColumn';

const Header = ({ columns }: { columns: IColumn[] }) => {
    return (
        <TableHead>
            <TableRow>
                {columns.map((column) => (
                    <HeaderCell key={column.id} column={column} />
                ))}
            </TableRow>
        </TableHead>
    );
};

export default Header;
