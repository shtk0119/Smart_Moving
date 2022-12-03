import Link from 'next/link';
import Image from 'next/image';
import { Box, List, ListItem, styled, Typography } from '@mui/material';

const Footer = () => {
  
  return (
    <FooterBox component='footer'>
      <FooterLogo>
        <Link href='/'>
          Smart Moving
        </Link>
      </FooterLogo>

      <FooterList>
        <FooterListItem>
          <Link href='#'>
            ホーム
          </Link>
        </FooterListItem>

        <FooterListItem>
          <Link href='#'>
            ヘルプ・お問い合わせ
          </Link>
        </FooterListItem>

        <FooterListItem>
          <Link href='#'>
            開発者について
          </Link>
        </FooterListItem>
      </FooterList>

      <Box>
        <Link href='https://github.com/shtk928'>
          <Image
            src='/GitHub_Mark_120px.png'
            alt='github_logo'
            height={20}
            width={20}
          />
        </Link>
      </Box>

      <FooterCopyright>
        &copy; 2022 Shinagawa Takanori
      </FooterCopyright>
    </FooterBox>
  );
};

export default Footer;

const FooterBox = styled(Box)(() => ({
  padding: '16px 0',
  textAlign: 'center'
}));

const FooterLogo = styled(Typography)(() => ({
  fontFamily: '"Oleo Script", cursive',
  fontWeight: 'bold',
  fontSize: '24px',
  '@media screen and (max-width:425px)': {
    fontSize: '16px'
  }
}));

const FooterList = styled(List)(() => ({
  display: 'flex'
}));

const FooterListItem = styled(ListItem)(() => ({
  justifyContent: 'center',
  '@media screen and (max-width:425px)': {
    fontSize: '10px'
  }
}));

const FooterCopyright = styled(Typography)(() => ({
  fontSize: '14px',
  color: '#718096',
  marginTop: '8px'
}));