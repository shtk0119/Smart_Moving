import Link from 'next/link';
import Image from 'next/image';
import { Box, Grid, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component='footer'
      p={2}
      textAlign='center'
      bgcolor='#f1f1f1'
    >
      <Typography
        fontFamily='"Oleo Script", cursive' 
        fontWeight='bold'
        fontSize='24px'
      >
        Smart Moving
      </Typography>

      <Grid container justifyContent='center' marginTop='16px'>
        <Grid item xs={2}>
          <Link href='/' color='default' >
            ホーム
          </Link>
        </Grid>
        <Grid item xs={2}>
          <Link href='#' color='default'>
            ヘルプ・お問い合わせ
          </Link>
        </Grid>
        <Grid item xs={2}>
          <Link href='#' color='default'>
            開発者について
          </Link>
        </Grid>
      </Grid>

      <Box marginTop='16px'>
        <Link href='https://github.com/shtk928'>
          <Image
            src='/GitHub_Mark_120px.png'
            alt='github_logo'
            height={20}
            width={20}
          />
        </Link>
      </Box>

      <Typography
        fontSize='14px'
        color='#718096'
        marginTop='16px'
      >
        &copy; 2022 Shinagawa Takanori
      </Typography>
    </Box>
  )
}

export default Footer;