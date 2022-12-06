import { Box } from '@mui/material';
import NavigationBar from '../organisms/NavigationBar';
import TaskMain from '../organisms/task/TaskMain';

const TaskTemplate = () => {
  return (
    <Box minHeight='100vh'>
      <NavigationBar />
      <TaskMain />
    </Box>
  )
}

export default TaskTemplate;