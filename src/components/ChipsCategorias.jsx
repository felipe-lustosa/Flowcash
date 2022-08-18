import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { useState } from 'react';

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

export default function ChipsCategorias(props) {

    return (
        <div className='flex justify-center flex-wrap px-1 m-1 gap-2 list-none' component="ul">
            {props.chipData.map((data) => {
                return (
                    <ListItem key={data.id}>
                        <Chip
                            style={{ backgroundColor: "#B80099" }}
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
