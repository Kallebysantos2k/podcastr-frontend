import React, { ChangeEvent, FormEvent, useState } from 'react';
import InputArea from '../InputArea';
import styles from './styles.module.scss';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(name, email, password);
  }

  function handleNameInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setName(value);
  }

  function handleEmailInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setEmail(value);
  }

  function handlePasswordInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setPassword(value);
  }

  return (
    <div className={styles.signUpContainer}>
      <h2>Crie uma nova conta</h2>

      <form
        className={styles.formContainer}
        onSubmit={(e) => handleSubmit(e)}
      >
        <InputArea
          name="name"
          label="Nome de utilizador:"
          type="text"
          value={name}
          onChange={(e) => handleNameInputChange(e)}
        />

        <InputArea
          name="email"
          label="Endereço de email:"
          type="email"
          value={email}
          onChange={(e) => handleEmailInputChange(e)}
        />

        <InputArea
          name="password"
          label="Sua senha:"
          type="password"
          value={password}
          onChange={(e) => handlePasswordInputChange(e)}
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
