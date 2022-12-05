import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, FormControl, IconButton, InputAdornment, styled, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { UserType } from '../../../types/user';
import { useForm, SubmitHandler } from 'react-hook-form';
import { auth } from '../../../libs/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserType>({});
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

  const onSubmit: SubmitHandler<UserType> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        router.push('/dashboards/task');
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  // ゲストログイン
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
    <FormBox>
      <DefaultFormControl fullWidth>
        <TextField
          type='email'
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
      </DefaultFormControl>

      <DefaultFormControl fullWidth>
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
            validationRules.password,
          )}
          error={errors.password && true}
          helperText={errors.password && errors.password.message}
        />
      </DefaultFormControl>

      {/* Firebase からのエラーメッセージ表示 現在は、Firebase のメッセージをそのまま載せている。 */}
      {error && <Typography fontSize='12px' color='#d32f2f' m='3px 14px 0'>{error}</Typography>}

      <GuestButton
        type='button'
        variant='contained'
        fullWidth
        onClick={onGuestLogin}
      >
        Guest Login
      </GuestButton>

      <SubmitButton
        type='button'
        variant='contained'
        fullWidth
        onClick={handleSubmit(onSubmit)}
      >
        Login
      </SubmitButton>

      <LinkText color={'primary'}>
        <Link href='signup'>
          アカウントをお持ちでない方
        </Link>
      </LinkText>

    </FormBox>
  )
}

export default LoginForm;

const FormBox = styled(Box)(() => ({
  backgroundColor: '#d3d3d3',
  width: '360px',
  padding: '16px',
  margin: '0 auto',
  borderRadius: '8px',
  '@media screen and (max-width:425px)': {
    width: '320px',
  }
}));

const DefaultFormControl = styled(FormControl)(() => ({
  marginTop: '24px'
}));

const SubmitButton = styled(Button)(() => ({
  backgroundColor: '#4299e1',
  fontWeight: 'bold',
  textTransform: 'none',
  marginTop: '24px',
}));

const LinkText = styled(Typography)(() => ({
  fontSize: '14px',
  textAlign: 'center',
  marginTop: '24px',
}));

// ゲストログイン
const GuestButton = styled(Button)(() => ({
  backgroundColor: '#4299e1',
  fontWeight: 'bold',
  textTransform: 'none',
  marginTop: '36px',
}));