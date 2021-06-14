import '../styles/globals.scss';
import React from 'react';

import { AuthContextProvider } from '../contexts/AuthContext';
import MainApp from '../layouts/MainApp';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <MainApp>
        <Component {...pageProps} />
      </MainApp>
    </AuthContextProvider>
  );
}

export default MyApp;
