import { Box } from '@mui/material';
import Header from '../organisms/share/Header';
import Main from '../organisms/homepage/Main';
import Footer from '../organisms/homepage/Footer';

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
      <Footer />
    </Box>
  )
}

export default Home;