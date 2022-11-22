import * as React from 'react';
import { Box } from '@mui/material';
import Topbar from '../organisms/share/Topbar';
import Sidebar from '../organisms/share/Sidebar';
import AccountMain from '../organisms/account/AccountMain';

const AccountPage = () => {
  return (
    <Box display='flex' minHeight='100vh' bgcolor='#f1f1f1'>
      <Topbar />
      <Sidebar />
      <AccountMain />
    </Box>
  )
}

export default AccountPage;