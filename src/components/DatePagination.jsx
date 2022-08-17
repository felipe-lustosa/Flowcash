import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { compareToday } from '../utils/DateFunctions';
import { Button, IconButton } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { reConvertDate, reConvertDate2 } from '../utils/ConvertDate';

export function DatePagination(props) {
    const [dateIndex, setDateIndex] = new React.useState(new Date())
    const [rowsButton, setRowsButton] = new React.useState([])
    const dateNow = new Date().toLocaleString()

    function handleClick(date, key) {
        var newDate = new Date(dateIndex)
        if (key == 3) {
            if (!compareToday(newDate)) {
                newDate.setDate(newDate.getDate() + 1);
                key -= 1
            }
        }
        if (key == 0) {
            newDate.setDate(newDate.getDate() - 1);
            key += 1
        }
        props.setSelectedDate({
            date: reConvertDate2(date),
            key: key
        })
        setDateIndex(newDate)
    }

    function handleClickAll() {
        props.setSelectedDate({
            date: new Date(),
            key: 5
        })
        setDateIndex(new Date())
    }

    React.useEffect(() => {
        var rows = [];
        var dateButton = new Date(dateIndex)
        for (var i = 0; i < 4; i++) {
            if (i != 0)
                dateButton.setDate(dateButton.getDate() - 1)
            rows.push(dateButton.toLocaleDateString());
        }
        setRowsButton(rows.reverse())
    }, [dateIndex])

    return (
        <Stack direction="row" spacing={1}>
            <IconButton color='primary' aria-label="before"><NavigateBeforeIcon /></IconButton>
            <p className='pr-2 pt-1 text-sky-500'>. . .</p>
            {rowsButton.map((date, index) => {
                const [day, month, year] = date.split('/');
                return <Button size='small' key={index} variant={index == props.selectedDate.key ? "contained" : "outlined"} onClick={() => { handleClick(day + '/' + month + '/' + year, index) }} sx={{ borderRadius: 4, boxShadow: 1, }}>{day + '/' + month}</Button>
            })}
            {!compareToday(dateIndex) && <p className='px-2 pt-1 text-sky-500'>. . .</p>}
            <Button size='small' key={5} variant={props.selectedDate.key == 5 ? "contained" : "outlined"} onClick={() => { handleClickAll() }} sx={{ borderRadius: 4, boxShadow: 1 }}>Todos</Button>
            <IconButton color='primary' aria-label="next"><NavigateNextIcon /></IconButton>
            {/* <Pagination showFirstButton={false} count={10} boundaryCount={0} variant={'outlined'} /> */}
        </Stack >
    );
}
