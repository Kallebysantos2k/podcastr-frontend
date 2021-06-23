import React, { ReactNode, useEffect } from 'react';
import Router from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { PlayerContextProvider } from '../../contexts/PlayerContext';
import Header from '../../components/Header';
import Player from '../../components/Player';

import styles from './styles.module.scss';

interface MainAppProps {
  children: ReactNode
}

export default function MainApp({ children }: MainAppProps) {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    !isAuthenticated && Router.push('/');
  }, [isAuthenticated]);

  return isAuthenticated
    ? (
      <PlayerContextProvider>
        <div className={styles.wrapper}>
          <main>
            <Header />
            {children}
          </main>

          <Player />
        </div>
      </PlayerContextProvider>
    )
    : (
      <>
        { children }
      </>
    );
}
