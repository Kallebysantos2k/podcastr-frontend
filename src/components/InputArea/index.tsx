import { InputHTMLAttributes, useState } from 'react';
import styles from './styles.module.scss';

interface InputAreaProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string,
  name: string,
  value: string,
}

export default function InputArea({
  name, label, value, ...defaultProps
}: InputAreaProps) {
  const [isActive, setIsActive] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  function handleInputChange(event) {
    if (defaultProps.onChange) defaultProps.onChange(event);

    const input = event.target.value;

    setInternalValue(input);
    setIsActive(input !== '');
  }

  function handleLoseFocus() {
    setIsActive(internalValue !== '');
  }

  return (
    <label
      className={styles.inputContainer}
      onFocus={() => setIsActive(true)}
      onBlur={handleLoseFocus}
    >
      <span className={(isActive) ? styles.isActive : ''}>
        {label}
      </span>

      <input
        id={name}
        value={internalValue}
        {...defaultProps}
        onChange={handleInputChange}
      />
    </label>
  );
}
