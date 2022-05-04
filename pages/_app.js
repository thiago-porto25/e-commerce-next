import '../styles/globals.css';
import { StateContextProvider } from '../context/StateContext';
import { Layout } from '../components';

import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <StateContextProvider>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContextProvider>
  );
}

export default MyApp;
