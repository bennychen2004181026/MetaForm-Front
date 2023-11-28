import * as React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import TableBody from './components/TableBody';
import TableHeader from './components/TableHeader';
import IColumn from '@/components/Table/interfaces/IColumn';

interface TableProps {
    rowsPerPage: number;
    columns: IColumn[];
    rows: Record<string, string>[];
}
const StickyHeadTable = ({ rowsPerPage, columns, rows }: TableProps) => {
    const [page, setPage] = React.useState(0);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const pageRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHeader columns={columns} />
                    <TableBody currentPageRows={pageRows} columns={columns} />
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
            />
        </Paper>
    );
};
export default StickyHeadTable;
