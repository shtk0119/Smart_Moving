import * as React from 'react';
import Link from 'next/link';
import { Box, Divider, IconButton, List, ListItemButton, ListItemIcon, Popper, Typography } from '@mui/material';
import { AddHome, Dashboard, Menu, Search } from '@mui/icons-material';

const NavigationMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const popOpen = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : e.currentTarget)
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <Menu />
      </IconButton>
      <Popper open={popOpen} anchorEl={anchorEl}>
      <Box
          mt={2}
          bgcolor="#fff"
          border={1}
          borderColor="#00000033"
          borderRadius={2}
        >
          <List disablePadding>
            <Link href='/dashboards/task'>
              <ListItemButton sx={{ flexDirection: 'column', p: '4px'}}>
                <ListItemIcon sx={{ justifyContent: 'center' }}>
                  <Dashboard />
                </ListItemIcon>
                <Typography fontSize='12px' mt={1}>タスク</Typography>
              </ListItemButton>
            </Link>
            <Divider />
            <Link href='#'>
              <ListItemButton sx={{ flexDirection: 'column', p: '4px'}}>
                <ListItemIcon sx={{ justifyContent: 'center' }}>
                  <AddHome />
                </ListItemIcon>
                <Typography fontSize='12px' mt={1}>引越し先情報</Typography>
              </ListItemButton>
            </Link>
            <Divider />
            <Link href='/dashboards/government'>
              <ListItemButton sx={{ flexDirection: 'column', p: '4px'}}>
                <ListItemIcon sx={{ justifyContent: 'center' }}>
                  <Search />
                </ListItemIcon>
                <Typography fontSize='12px' mt={1}>役所検索</Typography>
              </ListItemButton>
            </Link>
          </List>
        </Box>
      </Popper>
    </>
  );
};

export default NavigationMenu;