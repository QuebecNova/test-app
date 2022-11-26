import React from 'react'
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/material';

export function CenteredSpinner() {
  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress/>
    </Box>
  )
}
