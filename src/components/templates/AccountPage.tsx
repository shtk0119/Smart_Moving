import * as React from 'react';
import { Box } from '@mui/material';
import Topbar from '../organisms/share/Topbar';
import Sidebar from '../organisms/share/Sidebar';

const AccountPage = () => {
  return (
    <Box height='100vh' bgcolor='#f1f1f1'>
      <Topbar />
      <Sidebar />
    </Box>
  )
}

export default AccountPage;