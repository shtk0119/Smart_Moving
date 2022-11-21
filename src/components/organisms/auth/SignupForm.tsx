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
import { useForm, SubmitHandler } from 'react-hook-form';
import { SignupFieldValues } from '../../../types/Auth';
import { auth, db } from '../../../libs/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignupForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFieldValues>({});
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

  const onSubmit: SubmitHandler<SignupFieldValues> = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        setDoc(doc(db, 'users', userCredential.user.uid), {
          nickname: data.nickname,
          email: data.email,
          password: data.password,
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
          autoComplete='off'
          {...register(
            'nickname',
            validationRules.nickname,
          )}
          error={errors.nickname && true}
          helperText={errors.nickname && `${errors.nickname.message}`}
        />
      </FormControl>

      <FormControl fullWidth sx={{ mt: 3 }}>
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
            validationRules.password,
          )}
          error={errors.password && true}
          helperText={errors.password && errors.password.message}
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
        onClick={handleSubmit(onSubmit)}
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