import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import Head from 'next/head';
import { SignIn, SignUp } from '../components/AuthForm';
import styles from '../styles/auth.module.scss';
import { useAuth } from '../contexts/AuthContext';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'podcastr.token': token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default function Auth() {
  const { isAuthenticated } = useAuth();
  const [isSignIn, setIsSignIn] = useState(true);

  function toggleSignOperation() {
    setIsSignIn(!isSignIn);
  }

  return !isAuthenticated && (
    <div className={styles.authContainer}>
      <Head>
        <title>Entrar | Podcastr</title>
      </Head>

      <aside>
        <h1>Podcastr</h1>
        <p>O melhor para você ouvir, sempre</p>
      </aside>

      <main>
        {
          isSignIn ? (<SignIn />) : (<SignUp />)
        }

        <footer>
          {
            isSignIn
              ? (
                <>
                  <p>Ainda não possui uma conta?</p>
                  <button type="button" onClick={toggleSignOperation}>
                    Fazer cadastro!
                  </button>
                </>
              )
              : (
                <>
                  <p>Já possui uma conta?</p>
                  <button type="button" onClick={toggleSignOperation}>
                    Fazer login!
                  </button>
                </>
              )
          }
        </footer>
      </main>
    </div>
  );
}
