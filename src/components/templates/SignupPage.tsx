import { Box, Typography } from '@mui/material';
import Header from '../organisms/share/Header';
import SignupForm from '../organisms/auth/SignupForm';

const SignupPage = () => {
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
        Sign up
      </Typography>
      <SignupForm />
    </Box>
  )
}

export default SignupPage;