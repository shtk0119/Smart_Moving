import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, FormControl, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { auth } from '../../../libs/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

type LoginFieldValues = {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFieldValues>({});
  const [error, setError] = React.useState<string | undefined>();
  const [isShowPassword, setIsShowPassword] = React.useState<boolean>(false);
  const router = useRouter();

  const validationRules = {
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address',
      },
    },
    password: {
      required: 'Password is required',
    },
  };

  const onSubmit: SubmitHandler<LoginFieldValues> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        router.push('/dashboards/task');
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  const onGuestLogin = () => {
    const guest = {email: 'guest@guest.com', password: '123456789'};
    signInWithEmailAndPassword(auth, guest.email, guest.password)
      .then(() => {
        router.push('/dashboards/task');
      })
      .catch((error) => {
        setError(error.code);
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
          label='email'
          autoComplete='off'
          {...register(
            'email', 
            validationRules.email,
          )}
          error={errors.email && true}
          helperText={errors.email && errors.email.message}
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
          {...register(
            'password',
            validationRules.password
          )}
          error={errors.password && true}
          helperText={errors.password && errors.password.message}
        />
      </FormControl>

      {/* Firebase からのエラーメッセージ表示 現在は、Firebase のメッセージをそのまま載せている。 */}
      {error && <Typography fontSize='12px' color='#d32f2f' m='3px 14px 0'>{error}</Typography>}

      <Button
        type="button"
        variant="contained"
        fullWidth
        sx={{
          bgcolor: '#4299e1',
          fontWeight: 'bold',
          textTransform: 'none',
          mt: 5,
        }}
        onClick={onGuestLogin}
      >
        Guest Login
      </Button>

      <Button
        type="button"
        variant="contained"
        fullWidth
        sx={{
          bgcolor: '#4299e1',
          fontWeight: 'bold',
          textTransform: 'none',
          mt: 2,
        }}
        onClick={handleSubmit(onSubmit)}
      >
        Login
      </Button>

      <Typography fontSize='14px' color='primary' mt={3} textAlign='center'>
        <Link href='signup'>
          アカウントをお持ちでない方
        </Link>
      </Typography>
    </Box>
  )
}

export default LoginForm;