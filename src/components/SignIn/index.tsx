import React, { ChangeEvent, FormEvent, useState } from 'react';
import InputArea from '../InputArea';
import styles from './styles.module.scss';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(email, password);
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
    <form
      className={styles.formContainer}
      onSubmit={(e) => handleSubmit(e)}
    >
      <InputArea
        name="email"
        label="Seu email:"
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

      <button type="submit">ok</button>
    </form>
  );
}
