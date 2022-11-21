import React from 'react'
import { Box } from '@mui/material';
import Sidebar from '../organisms/share/Sidebar';
import Topbar from '../organisms/share/Topbar';

const TaskPage = () => {
  return (
    <Box height='100vh' bgcolor='#f1f1f1'>
      <Topbar />
      <Sidebar />
    </Box>
  )
}

export default TaskPage;