import React from 'react';

import TablePagination from '@mui/material/TablePagination';

interface IPaginationProps {
    numOfRowsPerPage: number;
    totalRows: number;
    currentPage: number;
    paginate: (event: React.MouseEvent | null, page: number) => void;
}
const Pagination = ({ numOfRowsPerPage, totalRows, currentPage, paginate }: IPaginationProps) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalRows / numOfRowsPerPage); i += 1) {
        pageNumbers.push(i);
    }

    return (
        <TablePagination
            component="div"
            count={totalRows}
            rowsPerPage={numOfRowsPerPage}
            page={currentPage}
            onPageChange={paginate}
        />
    );
};

export default Pagination;
