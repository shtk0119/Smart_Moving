import { Box, Divider } from '@mui/material';
import Footer from '../organisms/home/Footer';
import Main from '../organisms/home/Main';
import Header from '../organisms/share/Header';

const Home = () => {
  return (
    <Box 
      minHeight='100vh' 
      pb='200px'
      bgcolor='#f1f1f1' 
      position='relative' 
      boxSizing='border-box'
    >
      <Header />
      <Main />
      <Divider />
      <Footer />
    </Box>
  )
}

export default Home;