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
import { auth } from '../../../libs/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginForm = () => {
  const [isShowPassword, setIsShowPassword] = React.useState<boolean>(false);
  const router = useRouter();
  
  type FieldValues = {
    email: string;
    password: string;
  }

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({});
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        router.push('/dashboards/tasks');
      })
      .catch((error) => {
        alert(error.message);
      })
  }

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
            { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i }
          )}
          error={errors.email && true}
          helperText={errors.email && 'Email is required'}
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
          {...register('password', { required: true })}
          error={errors.password && true}
          helperText={errors.password && 'Password is required'}
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