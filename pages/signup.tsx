import Head from 'next/head';
import SignupTemplate from '../src/components/templates/SignupTemplate';

const Signup = () => {
  return (
    <>
      <Head>
        <title>
          Smart Moving - Signup
        </title>
      </Head>
      <SignupTemplate />
    </>
  )
}

export default Signup;