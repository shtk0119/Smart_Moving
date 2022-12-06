import * as React from 'react';
import { Box } from '@mui/material';
import NavigationBar from '../organisms/NavigationBar';
import GovernmentMain from '../organisms/GovernmentMain';

const GovernmentTemplate = () => {
  return (
    <Box display='flex' minHeight='100vh'>
      <NavigationBar />
      <GovernmentMain />
    </Box>
  );
};

export default GovernmentTemplate;