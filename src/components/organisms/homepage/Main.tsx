import Link from 'next/link';
import { Box, Button, Typography } from '@mui/material';

const Main = () => {
  return (
    <Box
      height='600px'
      width='1024px'
      m='0 auto'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Box textAlign='center'>
        <Typography component='h3' fontSize='32px' fontWeight='bold'>
          引越を Smart に終わらしませんか？
        </Typography>
        <Typography 
          component='h1'
          fontSize='48px'
          fontFamily='"Oleo Script", cursive'
          fontWeight='bold'
        >
          Smart Moving
        </Typography>
        <Typography
          fontSize='16px'
          fontWeight='bold'
          mt='20px'
        >
          初めての引越し。初めての土地。そんな「初めて」の不安をまとめて管理！
          <br/>
          引越の「何をやればいい？」「いつまでに終わればいい？」を解決する！
          <br/>
          引越しが Smart に管理できるアプリ！
        </Typography>
        <Box mt='32px'>
          <Link href='/signup'>
            <Button variant='contained'>はじめる！</Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default Main;