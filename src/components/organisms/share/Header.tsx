import Link from 'next/link';
import { Box, styled, Typography } from '@mui/material';

const Header = () => {
  
  return (
    <Box component='header'>
      <HeaderLogo>
        <Link href='/'>
          Smart Moving
        </Link>
      </HeaderLogo>
    </Box>
  )
}

export default Header;

const HeaderLogo = styled(Typography)(() => ({
  padding: '32px',
  fontFamily: '"Oleo Script", cursive',
  fontSize: '32px',
  fontWeight: 'bold',
  '@media screen and (max-width:425px)': {
    padding: '16px',
    fontSize: '24px',
  }
}));