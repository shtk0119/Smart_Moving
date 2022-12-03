import Link from 'next/link';
import { Box, Button, styled, Typography } from '@mui/material';

const Main = () => {
  
  return (
    <MainBox component='main'>
      <Box>
        <SubTitle>
          引越しを Smart に終わらしませんか？
        </SubTitle>

        <Title>
          Smart Moving
        </Title>

        <Introduction>
          初めての引越し。初めての土地。そんな「初めて」の不安をまとめて管理！
          <br/>
          引越の「何をやればいい？」「いつまでに終わればいい？」を解決する！
          <br/>
          引越しが Smart に管理できるアプリ！
        </Introduction>

        <ButtonBox>
          <Link href='/signup'>
            <Button variant='contained'>はじめる！</Button>
          </Link>
        </ButtonBox>
      </Box>
    </MainBox>
  )
}

export default Main;

const MainBox = styled(Box)(() => ({
  height: 'calc(100vh - 112px - 179px)',
  alignItems: 'center',
  textAlign: 'center',
  display: 'grid',
  '@media screen and (max-width:425px)': {
    height: 'calc(100vh - 68px - 158px)',
  }
}));

const Title = styled(Typography)(() => ({
  fontFamily: '"Oleo Script", cursive',
  fontSize: '48px',
  fontWeight: 'bold',
  '@media screen and (max-width:425px)': {
    fontSize: '36px'
  }
}));

const SubTitle = styled(Typography)(() => ({
  fontSize: '32px',
  fontWeight: 'bold',
  '@media screen and (max-width:425px)': {
    fontSize: '16px'
  }
}));

const Introduction = styled(Typography)(() => ({
  fontSize: '16px',
  fontWeight: 'bold',
  marginTop: '8px',
  '@media screen and (max-width:425px)': {
    fontSize: '12px'
  }
}));

const ButtonBox = styled(Box)(() => ({
  marginTop: '32px'
}));