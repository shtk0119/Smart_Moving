import { Box } from '@mui/material';
import Sidebar from '../organisms/share/Sidebar';
import Topbar from '../organisms/share/Topbar';
import NewsMain from '../organisms/news/NewsMain';

const NewsPage = () => {
  return (
    <Box display='flex' minHeight='100vh' bgcolor='#f1f1f1'>
      <Topbar />
      <Sidebar />
      <NewsMain />
    </Box>
  )
}

export default NewsPage;