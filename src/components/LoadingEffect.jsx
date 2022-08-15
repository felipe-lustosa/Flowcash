import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
    return (
        <Box className='flex justify-center content-center'>
            <CircularProgress size={30} sx={{ color: 'grey.500' }} />
        </Box>
    );
}
