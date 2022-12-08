import Head from 'next/head';
import TaskTemplate from '../../src/components/templates/TaskTemplate';

const Tasks = () => {
  return (
    <>
      <Head>
        <title>
          Dashboard - Task
        </title>
      </Head>
      <TaskTemplate />
    </>
  );
};

export default Tasks;