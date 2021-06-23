import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext, RequestValidationError } from '../../contexts/AuthContext';
import { displayErrorNotification, displaySuccessNotification } from '../../helpers/notificationDisplayer';
import InputArea from '../InputArea';
import styles from './styles.module.scss';

export default function SignIn() {
  const { register, handleSubmit, control } = useForm();
  const { signIn } = useContext(AuthContext);

  function handleSignIn(data) {
    signIn(data)
      .then((user) => displaySuccessNotification({
        title: 'Bem vindo',
        message: `Seja bem vindo de volta ${user.name}`,
      }))
      .catch((errors: [RequestValidationError] | string) => {
        if (typeof errors === 'string') {
          return displayErrorNotification({
            title: 'Erro ao tentar logar',
            message: errors === 'Unauthorized' ? 'Email ou Senha errados' : errors,
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
      <h2>Entre com sua conta</h2>

      <form onSubmit={handleSubmit(handleSignIn)}>
        <InputArea
          name="email"
          type="email"
          label="Endereço de email:"
          control={control}
          required
          otherProps={register('email')}
        />

        <InputArea
          name="password"
          type="password"
          label="Sua senha:"
          control={control}
          required
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
