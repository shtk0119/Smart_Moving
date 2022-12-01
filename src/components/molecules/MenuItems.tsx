import Link from 'next/link';
import { ListItemButton, ListItemIcon, Typography } from '@mui/material';
import { AddHome, Dashboard, Newspaper, Search } from '@mui/icons-material';

const MenuItems = (
  <>
    <Link href='/dashboards/task'>
      <ListItemButton sx={{ flexDirection: 'column', p: '8px 0'}}>
        <ListItemIcon sx={{ justifyContent: 'center' }}>
          <Dashboard />
        </ListItemIcon>
        <Typography fontSize='12px' mt={1}>タスク</Typography>
      </ListItemButton>
    </Link>

    <Link href='#'>
      <ListItemButton sx={{ flexDirection: 'column', p: '8px 0'}}>
        <ListItemIcon sx={{ justifyContent: 'center' }}>
          <AddHome />
        </ListItemIcon>
        <Typography fontSize='12px' mt={1}>引越し先情報</Typography>
      </ListItemButton>
    </Link>

    <Link href='/dashboards/government'>
      <ListItemButton sx={{ flexDirection: 'column', p: '8px 0'}}>
        <ListItemIcon sx={{ justifyContent: 'center' }}>
          <Search />
        </ListItemIcon>
        <Typography fontSize='12px' mt={1}>役所検索</Typography>
      </ListItemButton>
    </Link>

    <Link href='/dashboards/news'>
      <ListItemButton sx={{ flexDirection: 'column', p: '8px 0'}}>
        <ListItemIcon sx={{ justifyContent: 'center' }}>
          <Newspaper />
        </ListItemIcon>
        <Typography fontSize='12px' mt={1}>ニュース</Typography>
      </ListItemButton>
    </Link>
  </>
)

export default MenuItems;