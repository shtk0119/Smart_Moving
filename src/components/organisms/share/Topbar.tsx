import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
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
        <Typography fontSize='24px' fontFamily='"Oleo Script", cursive' fontWeight='bold'>
          Smart Moving
        </Typography>
        <Setting />
      </Toolbar>
    </AppBar>
  )
}

export default Topbar;