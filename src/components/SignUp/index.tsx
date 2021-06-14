import React from 'react';
import { useForm } from 'react-hook-form';
import InputArea from '../InputArea';
import styles from './styles.module.scss';

export default function SignUp() {
  const { register, handleSubmit } = useForm();

  function handleSignUp(data) {
    console.log(data);
  }

  return (
    <div className={styles.signUpContainer}>
      <h2>Crie uma nova conta</h2>

      <form onSubmit={handleSubmit(handleSignUp)}>
        <InputArea
          label="Nome de utilizador:"
          type="text"
          otherProps={register('name')}
        />

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
