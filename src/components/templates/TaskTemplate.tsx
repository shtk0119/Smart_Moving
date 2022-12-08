import { Box } from '@mui/material';
import NavigationBar from '../organisms/NavigationBar';
import TaskMain from '../organisms/TaskMain';

const TaskTemplate = () => {
  return (
    <Box>
      <NavigationBar />
      <TaskMain />
    </Box>
  )
}

export default TaskTemplate;