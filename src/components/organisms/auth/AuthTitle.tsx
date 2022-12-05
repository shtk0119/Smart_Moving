import { styled, Typography } from '@mui/material';

const AuthTitle = ({ value }: { value: string }) => {
  return (
    <Title>
      {value}
    </Title>
  )
}

export default AuthTitle;

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