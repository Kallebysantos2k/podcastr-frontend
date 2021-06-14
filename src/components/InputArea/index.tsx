import { InputHTMLAttributes, useState } from 'react';
import styles from './styles.module.scss';

interface InputAreaProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string,
  value?: string,
  otherProps?: any,
}

export default function InputArea({
  name, label, value, otherProps, ...defaultProps
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
        value={internalValue}
        onChange={handleInputChange}
        {...defaultProps}
        {...otherProps}
      />
    </label>
  );
}
