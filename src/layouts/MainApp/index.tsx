import React, { ReactNode } from 'react';
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
