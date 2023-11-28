import React from 'react';

import TableRow from '@mui/material/TableRow';

import IColumn from '@/components/Table/interfaces/IColumn';
import BodyCell from './components/BodyCell';

interface IBodyRowProps {
    columns: IColumn[];
    row: Record<string, string>;
}
const BodyRow = ({ columns, row }: IBodyRowProps) => {
    return (
        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
            {columns.map((column) => {
                const value = row[column.id];
                return <BodyCell tableColumn={column} cellValue={value} />;
            })}
        </TableRow>
    );
};

export default BodyRow;
