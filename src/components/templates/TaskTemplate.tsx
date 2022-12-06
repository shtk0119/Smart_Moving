import { Box } from '@mui/material';
import NavigationBar from '../organisms/NavigationBar';
import TaskMain from '../organisms/TaskMain';

const TaskTemplate = () => {
  return (
    <Box height='calc(100vh - 100px)'>
      <NavigationBar />
      <TaskMain />
    </Box>
  )
}

export default TaskTemplate;