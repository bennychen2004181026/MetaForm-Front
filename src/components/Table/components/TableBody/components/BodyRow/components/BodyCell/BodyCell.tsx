import React from 'react';

import TableCell from '@mui/material/TableCell';

import IColumn from '@/components/Table/interfaces/IColumn';

interface IBodyCellProps {
    tableColumn: IColumn;
    cellValue: string;
}
const BodyCell = ({ tableColumn, cellValue }: IBodyCellProps) => {
    return (
        <TableCell key={tableColumn.id} align={tableColumn.align}>
            {tableColumn.format && typeof cellValue === 'number'
                ? tableColumn.format(cellValue)
                : cellValue}
        </TableCell>
    );
};

export default BodyCell;
