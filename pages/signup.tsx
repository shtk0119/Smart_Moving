import Head from 'next/head';
import SignupPage from '../src/components/templates/SignupPage';

const Signup = () => {
  return (
    <>
      <Head>
        <title>
          Smart Moving - Signup
        </title>
      </Head>
      <SignupPage />
    </>
  )
}

export default Signup;