import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import styles from './styles.module.scss';

export default function UserNav() {
  const [isActive, setIsActive] = useState(false);

  function toogleIsActive() {
    setIsActive(!isActive);
    console.log(isActive);
  }

  return (
    <div className={styles.userNavContainer}>
      <header>
        <button
          type="button"
          onClick={toogleIsActive}
        >
          <span>
            <FaUserCircle />
          </span>
        </button>
      </header>

      <main />
    </div>
  );
}
