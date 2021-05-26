import styles from './styles.module.scss';

export default function Player() {
  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      <div className={styles.emptyPlayer}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>

      <footer className={styles.empty}>
        <div className={styles.progress}>
          <span>00:00</span>

          <div className={styles.slider}>
            <div className={styles.emptySlider} />
          </div>

          <span>00:00</span>
        </div>

        <div className={styles.buttons}>
          <button type="button">
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>

          <button type="button">
            <img src="/play-previous.svg" alt="Reproduzir anterior" />
          </button>

          <button className={styles.playButton} type="button">
            <img src="/play.svg" alt="Reproduzir" />
          </button>

          <button type="button">
            <img src="/play-next.svg" alt="Reproduzir proximo" />
          </button>

          <button type="button">
            <img src="/repeat.svg" alt="Repetir podcast" />
          </button>
        </div>
      </footer>
    </div>
  );
}
