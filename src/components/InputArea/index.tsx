import { InputHTMLAttributes, useEffect, useState } from 'react';
import { Control, useWatch } from 'react-hook-form';
import styles from './styles.module.scss';

interface InputAreaProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  label: string,
  control?: Control,
  defaultValue?: string,
  otherProps?: any,
}

export default function InputArea({
  name, label, control, defaultValue, otherProps, ...defaultProps
}: InputAreaProps) {
  const [isActive, setIsActive] = useState(false);

  const input = useWatch({ control, defaultValue, name });
  useEffect(() => setIsActive(!!input), [input]);

  function handleLoseFocus() {
    setIsActive(!!input);
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
        defaultValue={defaultValue}
        {...defaultProps}
        {...otherProps}
      />
    </label>
  );
}
