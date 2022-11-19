import { Box } from '@mui/material';
import Header from '../organisms/homepage/Header';
import Main1 from '../organisms/homepage/Main1';
import Main2 from '../organisms/homepage/Main2';
import Footer from '../organisms/homepage/Footer';

const HomePage = () => {
  return (
    <Box>
      <Header />
      <Main1 />
      <Main2 />
      <Footer />
    </Box>
  )
}

export default HomePage;