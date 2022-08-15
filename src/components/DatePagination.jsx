import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export function DatePagination() {
    const date = {
        date: 1, date: 2, date: 3, date: 4, date: 5, date: 6, date: 7, date: 8, date: 9, date: 10
    }

    return (
        <Stack spacing={2}>
            <Pagination showFirstButton={false} count={10} boundaryCount={0} />
        </Stack>
    );
}
