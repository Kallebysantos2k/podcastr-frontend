import '../styles/globals.scss';
import 'react-notifications-component/dist/theme.css';
import React from 'react';
import ReactNotfications from 'react-notifications-component';
import { AuthContextProvider } from '../contexts/AuthContext';
import MainApp from '../layouts/MainApp';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <MainApp>
        <ReactNotfications />
        <Component {...pageProps} />
      </MainApp>
    </AuthContextProvider>
  );
}

export default MyApp;
