import { Box, Divider, styled } from '@mui/material';
import Header from '../organisms/share/Header';
import Main from '../organisms/home/Main';
import Footer from '../organisms/home/Footer';

const Home = () => {

  return (
    <Box>
      <Header />
      <Main />
      <Divider />
      <Footer />
    </Box>
  )
}

export default Home;