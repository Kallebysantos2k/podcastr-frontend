import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthContext';
import InputArea from '../InputArea';
import styles from './styles.module.scss';

export default function SignIn() {
  const { register, handleSubmit, control } = useForm();
  const { signIn } = useContext(AuthContext);

  function handleSignIn(data) {
    signIn(data);
    console.log(data);
  }

  return (
    <div className={styles.formContainer}>
      <h2>Entre com sua conta</h2>

      <form onSubmit={handleSubmit(handleSignIn)}>
        <InputArea
          name="email"
          type="email"
          label="Endereço de email:"
          control={control}
          otherProps={register('email')}
        />

        <InputArea
          name="password"
          type="password"
          label="Sua senha:"
          control={control}
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
