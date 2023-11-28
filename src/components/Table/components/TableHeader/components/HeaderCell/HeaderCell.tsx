import React from 'react';

import TableCell from '@mui/material/TableCell';

import IColumn from '@/components/Table/interfaces/IColumn';

const HeaderCell = ({ column }: { column: IColumn }) => {
    return (
        <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
            {column.label}
        </TableCell>
    );
};

export default HeaderCell;
