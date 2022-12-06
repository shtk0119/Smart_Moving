import Head from "next/head";
import GovernmentTemplate from "../../src/components/templates/GovernmentTemplate";

const Government = () => {
  return (
    <>
      <Head>
        <title>
          Dashboard - Government
        </title>
      </Head>
      <GovernmentTemplate />
    </>
  );
};

export default Government;