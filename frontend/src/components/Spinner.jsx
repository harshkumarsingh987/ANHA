//src/components/Spinner.jsx
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Spinner = ({ message = "Loading..." }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
      }}
    >
      <CircularProgress color="primary" size={50} thickness={4} />
      <Typography variant="subtitle1" mt={2}>
        {message}
      </Typography>
    </Box>
  );
};

export default Spinner;
