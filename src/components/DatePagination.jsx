import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { DateArray } from '../utils/DateArray';


export function DatePagination() {
    const dateNow = new Date().toLocaleString()


    var daylist = DateArray(new Date("2021-05-01"), new Date());
    // daylist.map((v) => v.toISOString().slice(0, 10)).join("")

    console.log(daylist.toLocaleString())


    return (
        <Stack spacing={2}>
            <Pagination showFirstButton={false} count={10} boundaryCount={0} variant={'outlined'} />
        </Stack>
    );
}
