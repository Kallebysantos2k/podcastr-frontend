import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import styles from './styles.module.scss';

export default function UserNav() {
  const { isAdmin, logout } = useAuth();
  const [isActive, setIsActive] = useState(false);

  function toogleIsActive() {
    setIsActive(!isActive);
  }

  return (
    <div
      className={styles.userNavContainer}
      onMouseLeave={() => setIsActive(false)}
    >
      <button
        type="button"
        onClick={toogleIsActive}

      >
        <span>
          <FaUserCircle />
        </span>
      </button>

      {
        isActive && (
          <nav>
            <ul>
              <li>Meu perfil</li>

              {
                isAdmin && (
                  <li>Dashboard</li>
                )
              }

              <li onClick={logout}>
                Encerrar sessão
              </li>
            </ul>
          </nav>
        )
      }
    </div>
  );
}
