import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popper, Typography } from '@mui/material';
import { AccountCircle, Logout, Settings } from '@mui/icons-material';
import { useFirebaseAuthContext } from '../../contexts/FirebaseAuthContext';

const Setting = () => {
  const { user, logout } = useFirebaseAuthContext();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const popOpen = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const onClickLogout = async () => {
    logout;
    router.push('/login');
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <AccountCircle />
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
            <ListItem>
              <Avatar />
              <Box ml={2}>
                <Typography>
                  {user && user.displayName}
                </Typography>
                <Typography>
                  {user && user.email}
                </Typography>
              </Box>
            </ListItem>
            <Divider />
            <Link href="/dashboards/account" color="default">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary="アカウント" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={onClickLogout}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary="ログアウト" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Popper>
    </>
  );
};

export default Setting;