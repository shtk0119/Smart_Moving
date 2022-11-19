import Head from 'next/head';
import type { AppProps } from 'next/app';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Smart Moving</title>
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App;