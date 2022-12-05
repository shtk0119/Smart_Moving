import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, FormControl, IconButton, InputAdornment, styled, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { UserType } from '../../../types/user';
import { useForm, SubmitHandler } from 'react-hook-form';
import { auth, db } from '../../../libs/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignupForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserType>({});
  const [error, setError] = React.useState<string | undefined>();
  const [isShowPassword, setIsShowPassword] = React.useState<boolean>(false);
  const router = useRouter();

  const validationRules = {
    nickname: {
      required: 'Nickname is required',
    },
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address',
      },
    },
    password: {
      required: 'Password is required',
      minLength: {
        value: 6,
        message: 'Password must be more than 6 characters',
      },
    },
  };

  const onSubmit: SubmitHandler<UserType> = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        updateProfile(userCredential.user, { displayName: data.nickname });
        setDoc(doc(db, 'users', userCredential.user.uid), {
          nickname: data.nickname,
          email: data.email,
          password: data.password,
        });
        router.push('dashboards/task');
      })
      .catch((error) => {
        setError(error.code)
      });
  };

  return (
    <FormBox>
      <DefaultFormControl fullWidth>
       <TextField
          type='text'
          variant='outlined'
          label='Nickname'
          autoComplete='off'
          {...register(
            'nickname',
            validationRules.nickname,
          )}
          error={errors.nickname && true}
          helperText={errors.nickname && `${errors.nickname.message}`}
        />
      </DefaultFormControl>

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

      <SubmitButton
        type='button'
        variant='contained'
        fullWidth
        onClick={handleSubmit(onSubmit)}
        // onClick={onClick}
      >
        Sign up
      </SubmitButton>

      <LinkText color={'primary'}>
        <Link href='login'>
          アカウントをお持ちの方
        </Link>
      </LinkText>
    </FormBox>
  );
};

export default SignupForm;

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