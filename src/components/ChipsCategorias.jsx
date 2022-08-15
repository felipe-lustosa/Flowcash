import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { useState } from 'react';

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

export default function ChipsCategorias(props) {

    const [chipData, setChipData] = useState([
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'Polymer' },
        { key: 3, label: 'React' },
    ]);

    // setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    return (
        <div className='flex justify-center flex-wrap px-1 m-1 gap-2 list-none' component="ul">
            {props.chipData.map((data) => {
                return (
                    <ListItem key={data.id}>
                        <Chip
                            color='primary'
                            label={data.name}
                            onClick={() => { props.handleOpenModal('editar', data.id) }}
                            onDelete={() => { props.handleOpenModal('excluir', data.id) }}
                        />
                    </ListItem>
                );
            })}
        </div>
    );
}
