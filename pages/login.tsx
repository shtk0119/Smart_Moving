import Head from 'next/head';
import LoginTemplate from '../src/components/templates/LoginTemplate';

const Login = () => {
  return (
    <>
      <Head>
        <title>
          Smart Moving - Login
        </title>
      </Head>
      <LoginTemplate />
    </>
  )
}

export default Login;