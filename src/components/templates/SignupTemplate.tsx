import { Box, styled, Typography } from '@mui/material';
import Header from '../organisms/Header';
import SignupForm from '../organisms/SignupForm';

const SignupPage = () => {
  return (
    <Box height='100vh'>
      <Header />
      <Title>
        Sign up
      </Title>
      <SignupForm />
    </Box>
  )
}

export default SignupPage;

const Title = styled(Typography)(() => ({
  fontSize: '42px',
  fontWeight: 'bold',
  fontFamily: '"Oleo Script", cursive',
  textAlign: 'center',
  margin: '32px',
  '@media screen and (max-width:425px)': {
    fontSize: '32px',
  }
}));