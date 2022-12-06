import * as React from 'react';
import { Box } from '@mui/material';
import NavigationBar from '../organisms/NavigationBar';
import AccountMain from '../organisms/AccountMain';

const AccountTemplate = () => {
  return (
    <Box display='flex' minHeight='100vh'>
      <NavigationBar />
      <AccountMain />
    </Box>
  );
};

export default AccountTemplate;