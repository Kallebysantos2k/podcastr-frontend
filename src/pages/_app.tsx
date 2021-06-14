import '../styles/globals.scss';
import React, { useContext } from 'react';
import styles from '../styles/app.module.scss';

import { PlayerContextProvider } from '../contexts/PlayerContext';
import Header from '../components/Header';
import Player from '../components/Player';
import Auth from './auth';
import { AuthContext, AuthContextProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }) {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <AuthContextProvider>
      <div>
        {
        (isAuthenticated)
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
          : (<Auth />)
        }
      </div>
    </AuthContextProvider>
  );
}

export default MyApp;
