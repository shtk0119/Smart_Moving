import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Box, 
  Button, 
  FormControl,
  IconButton,
  InputAdornment, 
  TextField, 
  Typography 
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { auth, db } from '../../../libs/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignupForm = () => {
  const [nickname, setNickname] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [isShowPassword, setIsShowPassword] = React.useState<boolean>(false);
  const router = useRouter();

  const onClickSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setDoc(doc(db, 'users', userCredential.user.uid), {
          nickname: nickname,
          email: email,
          password: password,
        });
        router.push('/dashboards/tasks');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <Box 
      width='360px'
      borderRadius={3}
      m='42px auto 0'
      p={3} 
      bgcolor='#d3d3d3'
    >
      <FormControl fullWidth sx={{ mt: 3 }}>
        <TextField
          type='text'
          variant='outlined'
          label='Nickname'
          onChange={(e) => setNickname(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth sx={{ mt: 3 }}>
        <TextField
          type='email'
          variant='outlined'
          label='email'
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth sx={{ mt: 3 }}>
        <TextField
          type={isShowPassword ? 'text' : 'password'}
          variant='outlined'
          label='password'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => setIsShowPassword(!isShowPassword)}>
                  {isShowPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
        onClick={onClickSignup}
      >
        Sign up
      </Button>

      <Typography fontSize='14px' color='primary' mt={3} textAlign='center'>
        <Link href='login'>
          アカウントをお持ちの方
        </Link>
      </Typography>
    </Box>
  );
};

export default SignupForm;