import * as React from 'react';
import { Box } from '@mui/material';
import NavigationBar from '../organisms/NavigationBar';
import AccountMain from '../organisms/account/AccountMain';

const AccountPage = () => {
  return (
    <Box display='flex' minHeight='100vh' bgcolor='#f1f1f1'>
      <NavigationBar />
      <AccountMain />
    </Box>
  );
};

export default AccountPage;