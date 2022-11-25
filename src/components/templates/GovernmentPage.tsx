import * as React from 'react';
import { Box } from '@mui/material';
import Topbar from '../organisms/share/Topbar';
import Sidebar from '../organisms/share/Sidebar';
import GovernmentMain from '../organisms/government/GovernmentMain';

const GovernmentPage = () => {
  return (
    <Box display='flex' minHeight='100vh' bgcolor='#f1f1f1'>
      <Topbar />
      <Sidebar />
      <GovernmentMain />
    </Box>
  )
}

export default GovernmentPage;