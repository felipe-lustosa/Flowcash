import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', pt: 40 }}>
            <CircularProgress sx={{ color: 'grey.500' }} />
        </Box>
    );
}
