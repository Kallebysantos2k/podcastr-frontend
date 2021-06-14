import React, { ChangeEvent, FormEvent, useState } from 'react';
import InputArea from '../InputArea';
import styles from './styles.module.scss';

export default function SignIn() {
  const [email, setEmail] = useState('');
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(email);
  }

  function handleEmailInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setEmail(value);
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

      <button type="submit">ok</button>
    </form>
  );
}
