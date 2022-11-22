import * as React from 'react';
import { List } from '@mui/material';
import MenuItems from '../../molecules/MenuItems';

const Sidebar = () => {

  return (
    <List
      component='nav'
      sx={{
        width: '88px',
        p: '64px 0 0',
        bgcolor: '#ffffff',
        borderRight: '1px solid #00000033', 
        borderBottom: '1px solid #00000033',
        position: 'fixed'
      }}
    >
      {MenuItems}
    </List>
  )
}

export default Sidebar;