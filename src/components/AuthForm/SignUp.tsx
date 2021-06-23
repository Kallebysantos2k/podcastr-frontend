import React from 'react';
import { useForm } from 'react-hook-form';
import { RequestValidationError, useAuth } from '../../contexts/AuthContext';
import {
  displayErrorNotification,
  displaySuccessNotification,
} from '../../helpers/notificationDisplayer';
import InputArea from '../InputArea';
import styles from './styles.module.scss';

export default function SignUp() {
  const { signUp } = useAuth();
  const { register, handleSubmit, control } = useForm();

  function handleSignUp(data) {
    signUp(data)
      .then((user) => displaySuccessNotification({
        title: `Bem vindo ${user.name}`,
        message: 'Sua conta foi criada com sucesso',
      }))
      .catch((errors: [RequestValidationError] | string) => {
        if (typeof errors === 'string') {
          return displayErrorNotification({
            title: 'Erro ao criar sua conta',
            message: errors,
          });
        }

        return errors.forEach((error) => displayErrorNotification({
          title: `Erro no campo: ${error.property}`,
          message: `${error.description}`,
        }));
      });
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
