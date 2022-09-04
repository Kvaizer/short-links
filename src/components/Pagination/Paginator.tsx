import React, {MouseEvent, ChangeEvent} from 'react';
import TablePagination from '@mui/material/TablePagination';
import {useAppSelector} from '../../hooks';
import Skeleton from '@mui/material/Skeleton';

type PaginationType = {
    page: number
    setPage: (page: number) => void
    totalAmountOfItems: number
    rowsPerPage: number
    setRowsPerPage: (rowsPerPage: number) => void
}

export const Paginator: React.FC<PaginationType> = React.memo(({page, setPage, totalAmountOfItems, rowsPerPage, setRowsPerPage}) => {
    const appStatus = useAppSelector(state => state.app.status)

    const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, page: number) => {
        setPage(page)
    };
    console.log(page)
    const handlerChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    return (
        appStatus === 'succeeded' ? <TablePagination
            component="div"
            rowsPerPageOptions={[5, 10, 25]}
            count={totalAmountOfItems}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handlerChangeRowsPerPage}
            showFirstButton
            showLastButton
        /> : <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
    );
})