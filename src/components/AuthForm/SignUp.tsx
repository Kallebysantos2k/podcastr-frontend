import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import InputArea from '../InputArea';
import styles from './styles.module.scss';

export default function SignUp() {
  const { signUp } = useAuth();
  const { register, handleSubmit, control } = useForm();

  function handleSignUp(data) {
    signUp(data);
  }

  return (
    <div className={styles.formContainer}>
      <h2>Crie uma nova conta</h2>

      <form onSubmit={handleSubmit(handleSignUp)}>
        <InputArea
          name="name"
          type="text"
          label="Nome de utilizador:"
          control={control}
          otherProps={register('name')}
        />

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
          Criar conta
        </button>
      </form>
    </div>
  );
}
