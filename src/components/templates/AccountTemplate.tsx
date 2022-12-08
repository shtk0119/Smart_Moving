import { Box } from '@mui/material';
import NavigationBar from '../organisms/NavigationBar';
import AccountMain from '../organisms/AccountMain';

const AccountTemplate = () => {
  return (
    <Box>
      <NavigationBar />
      <AccountMain />
    </Box>
  );
};

export default AccountTemplate;