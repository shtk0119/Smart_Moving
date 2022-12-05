import { Box } from '@mui/material';
import Header from '../organisms/Header';
import AuthTitle from '../organisms/auth/AuthTitle';
import LoginForm from '../organisms/auth/LoginForm';

const LoginTemplate = () => {
  return (
    <Box height='100vh'>
      <Header />
      <AuthTitle value={'Login'} />
      <LoginForm />
    </Box>
  )
}

export default LoginTemplate;