import { Box } from '@mui/material';
import Head from 'next/head';
import NavigationBar from '../../src/components/organisms/NavigationBar';
import TaskTemplate from '../../src/components/templates/TaskTemplate';

const Tasks = () => {
  return (
    <>
      <Head>
        <title>
          Dashboard - Task
        </title>
      </Head>
      <NavigationBar />

      <Box bgcolor='#fff' marginTop={8} height='100px'></Box>
      <Box bgcolor='#fff' marginTop={3} height='100px'></Box>
    </>
  );
};

export default Tasks;