import * as React from 'react';
import Stack from '@mui/material/Stack';
import { compareToday } from '../utils/DateFunctions';
import { Button, getContrastRatio, IconButton } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { reConvertDate, reConvertDate2 } from '../utils/ConvertDate';

const styleDateButton = {
    backgroundColor: "white",
    borderColor: "#B80099",
    color: "black"
}

const styleSelectedDateButton = {
    backgroundColor: "#B80099",
    borderColor: "#B80099",
    color: "white"
}

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
        if (key >= 4) {
            date = new Date().toLocaleDateString()
            key = 4
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
            key: 4
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

    var aux = props.selectedDate.date
    return (
        <Stack direction="row" spacing={1}>
            <IconButton style={{ color: '#B80099' }} aria-label="before" onClick={() => { handleClick(new Date(aux.setDate(aux.getDate() - 1)).toLocaleDateString(), props.selectedDate.key - 1) }}><NavigateBeforeIcon /></IconButton>
            <p className='pr-2 pt-1 text-[#B80099]'>. . .</p>
            {rowsButton.map((date, index) => {
                const [day, month, year] = date.split('/');
                return <Button size='small' style={index == props.selectedDate.key ? styleSelectedDateButton : styleDateButton} key={index} variant="outlined" onClick={() => { handleClick(day + '/' + month + '/' + year, index) }} sx={{ borderRadius: 4, boxShadow: 1, }}>{day + '/' + month}</Button>
            })}
            {!compareToday(dateIndex) && <p className='px-2 pt-1 text-[#B80099]'>. . .</p>}
            <Button size='small' key={4} style={4 == props.selectedDate.key ? styleSelectedDateButton : styleDateButton} variant="outlined" onClick={() => { handleClickAll() }} sx={{ borderRadius: 4, boxShadow: 1 }}>Todos</Button>
            <IconButton style={{ color: '#B80099' }} aria-label="next" onClick={() => { handleClick(new Date(aux.setDate(aux.getDate() + 1)).toLocaleDateString(), props.selectedDate.key + 1) }}><NavigateNextIcon /></IconButton>
            {/* <Pagination showFirstButton={false} count={10} boundaryCount={0} variant={'outlined'} /> */}
        </Stack >
    );
}
