import * as React from 'react';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import { Menu } from '@mui/icons-material';
import Setting from '../../molecules/Setting';

const Topbar = () => {
  return (
    <AppBar color='default' sx={{ boxShadow: 'none' }}>
      <Toolbar 
        sx={{ 
          backgroundColor: '#fff', 
          borderBottom: '1px solid #00000033', 
          justifyContent: 'space-between' 
        }}
      >
        <IconButton color='inherit'>
          <Menu />
        </IconButton>
        <Setting />
      </Toolbar>
    </AppBar>
  )
}

export default Topbar;