import Head from 'next/head';
import LoginPage from '../src/components/templates/LoginPage';

const Login = () => {
  return (
    <>
      <Head>
        <title>
          Smart Moving - Login
        </title>
      </Head>
      <LoginPage />
    </>
  )
}

export default Login;