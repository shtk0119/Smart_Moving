import { Box, Divider } from '@mui/material';
import Header from '../organisms/Header';
import Main from '../organisms/Main';
import Footer from '../organisms/Footer';

const HomeTemplate = () => {

  return (
    <Box>
      <Header />
      <Main />
      <Divider />
      <Footer />
    </Box>
  )
}

export default HomeTemplate;