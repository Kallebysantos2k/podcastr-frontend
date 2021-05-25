import styles from './styles.module.scss';

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <img src="/logo.svg" alt="Logo Podcastr" />

      <p>O melhor para você ouvir, sempre</p>

      <span> Ter, 25 Maio</span>
    </header>
  );
}
