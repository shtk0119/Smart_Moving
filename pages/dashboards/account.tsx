import Head from 'next/head';
import AccountTemplate from '../../src/components/templates/AccountTemplate';

const Account = () => {
  return (
    <>
      <Head>
        <title>
          Dashboard - Government
        </title>
      </Head>
      <AccountTemplate />
    </>
  );
};

export default Account;