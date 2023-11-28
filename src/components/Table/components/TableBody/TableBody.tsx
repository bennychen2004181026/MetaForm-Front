import React from 'react';

import MUITableBody from '@mui/material/TableBody';

import BodyRow from './components/BodyRow';
import IColumn from '@/components/Table/interfaces/IColumn';

interface ITableBodyProps {
    columns: IColumn[];
    currentPageRows: Record<string, string>[];
}
const TableBody = ({ currentPageRows, columns }: ITableBodyProps) => {
    return (
        <MUITableBody>
            {currentPageRows.map((row) => {
                return <BodyRow key={row.id} columns={columns} row={row} />;
            })}
        </MUITableBody>
    );
};

export default TableBody;
