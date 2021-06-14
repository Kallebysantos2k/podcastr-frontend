import React, { useState } from 'react';
import { SignIn, SignUp } from '../components/AuthForm';
import styles from '../styles/auth.module.scss';

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(false);

  function toggleSignOperation() {
    setIsSignIn(!isSignIn);
  }

  return (
    <div className={styles.authContainer}>

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
