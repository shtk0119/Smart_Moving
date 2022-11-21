import React from 'react'
import { Box } from '@mui/material';
import Sidebar from '../organisms/share/Sidebar';
import Topbar from '../organisms/share/Topbar';
import TaskMain from '../organisms/task/TaskMain';

const TaskPage = () => {
  return (
    <Box display='flex' bgcolor='#f1f1f1'>
      <Topbar />
      <Sidebar />
      <TaskMain />
    </Box>
  )
}

export default TaskPage;