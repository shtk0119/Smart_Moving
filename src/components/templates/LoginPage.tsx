import { Box, Typography } from '@mui/material';
import Header from '../organisms/Header';
import LoginForm from '../organisms/auth/LoginForm';

const LoginPage = () => {
  return (
    <Box height='100vh' bgcolor='#f1f1f1'>
      <Header />
      <Typography
        component='h1'
        fontSize='42px'
        fontWeight='bold'
        fontFamily='"Oleo Script", cursive'
        textAlign='center'
        m={6}
      >
        Login
      </Typography>
      <LoginForm />
    </Box>
  )
}

export default LoginPage;