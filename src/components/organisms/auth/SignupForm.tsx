import * as React from 'react';
import Link from 'next/link';
import { 
  Box, 
  Button, 
  FormControl, 
  Input, 
  InputLabel, 
  Typography 
} from '@mui/material';

const SignupForm = () => {
  const [nickname, setNickname] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  return (
    <Box 
      width='360px'
      borderRadius={3}
      m='42px auto 0'
      p={3} 
      bgcolor='#d3d3d3'
    >
      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel>Nickname</InputLabel>
        <Input
          type='text'
          onChange={(e) => setNickname(e.target.value)}
        />
      </FormControl>
      
      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel>Email</InputLabel>
        <Input
          type='email'
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel>Password</InputLabel>
        <Input
          type='password'
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      <Button
        type="button"
        variant="contained"
        fullWidth
        sx={{
          bgcolor: '#4299e1',
          fontWeight: 'bold',
          textTransform: 'none',
          mt: 6,
        }}
      >
        Sign up
      </Button>

      <Typography fontSize='14px' color='primary' mt={3} textAlign='center'>
        <Link href='login'>
          アカウントをお持ちの方
        </Link>
      </Typography>
    </Box>
  )
}

export default SignupForm;