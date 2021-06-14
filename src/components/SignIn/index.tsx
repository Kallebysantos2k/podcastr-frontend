import React from 'react';
import { useForm } from 'react-hook-form';
import InputArea from '../InputArea';
import styles from './styles.module.scss';

export default function SignIn() {
  const { register, handleSubmit } = useForm();

  function handleSignIn(data) {
    console.log(data);
  }

  return (
    <div className={styles.signInContainer}>
      <h2>Entre com sua conta</h2>

      <form onSubmit={handleSubmit(handleSignIn)}>
        <InputArea
          label="Endereço de email:"
          type="email"
          otherProps={register('email')}
        />

        <InputArea
          label="Sua senha:"
          type="password"
          otherProps={register('password')}
        />

        <button
          className={styles.submitButton}
          type="submit"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
