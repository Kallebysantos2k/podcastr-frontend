import '../styles/globals.scss';
import React from 'react';
import styles from '../styles/app.module.scss';

import { PlayerContextProvider } from '../contexts/PlayerContext';
import Header from '../components/Header';
import Player from '../components/Player';
import Auth from './auth';

function MyApp({ Component, pageProps }) {
  const isLogged = false;

  return (isLogged)
    ? (
      <PlayerContextProvider>
        <div className={styles.wrapper}>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>

          <Player />
        </div>
      </PlayerContextProvider>
    )
    : (
      <Auth />
    );
}

export default MyApp;
