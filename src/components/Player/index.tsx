import React, { useEffect, useRef, useState } from 'react';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { usePlayer } from '../../contexts/PlayerContext';
import styles from './styles.module.scss';
import convertDurationToTimeString from '../../helpers/convertDurationToTimeString';

export default function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  const {
    hasNext,
    hasPrevious,
    playNext,
    playPrevious,
    setPlayState,
    isPlaying,
    isLooping,
    isShuffling,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    episodeList,
    currentEpisodeIndex,
  } = usePlayer();

  const episode = episodeList[currentEpisodeIndex];

  useEffect(() => {
    if (!audioRef.current) return;

    isPlaying
      ? audioRef.current.play()
      : audioRef.current.pause();
  }, [isPlaying]);

  function setupProgressListener() {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(audioRef.current.currentTime);
    });
  }

  function handleSliderSeek(amout: number) {
    audioRef.current.currentTime = amout;
    setProgress(amout);
  }

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      {
        episode
          ? (
            <div className={styles.currentEpisode}>
              <img
                src={episode.thumbnail}
                alt={episode.name}
              />
              <strong>{episode.name}</strong>
              <span>{episode.members}</span>
            </div>
          )
          : (
            <div className={styles.emptyPlayer}>
              <strong>Selecione um podcast para ouvir</strong>
            </div>
          )
      }

      {
        episode && (
          <audio
            src={episode.audio}
            ref={audioRef}
            autoPlay
            loop={isLooping}
            onEnded={playNext}
            onPlay={() => setPlayState(true)}
            onPause={() => setPlayState(false)}
            onLoadedMetadata={setupProgressListener}
          />
        )
      }

      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>{convertDurationToTimeString(progress)}</span>

          <div className={styles.slider}>
            {
              episode
                ? (
                  <Slider
                    max={episode.duration}
                    value={progress}
                    onChange={handleSliderSeek}
                    trackStyle={{ backgroundColor: '#04d361' }}
                    railStyle={{ backgroundColor: '#9f75ff' }}
                    handleStyle={{ borderColor: '#9f75ff' }}
                  />
                )
                : (
                  <div className={styles.emptySlider} />
                )
            }
          </div>

          <span>{episode?.timeString ?? '00:00:00'}</span>
        </div>

        <div className={styles.buttons}>
          <button
            type="button"
            disabled={!episode || episodeList.length === 1}
            className={isShuffling ? styles.isActive : ''}
            onClick={toggleShuffle}
          >
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>

          <button
            type="button"
            disabled={!episode || !hasPrevious}
            className={styles.playPreviousButton}
            onClick={playPrevious}
          >
            <img src="/play-previous.svg" alt="Reproduzir anterior" />
          </button>

          <button
            type="button"
            disabled={!episode}
            className={styles.playButton}
            onClick={togglePlay}
          >
            {
              isPlaying
                ? <BsPauseFill />
                : <BsPlayFill />
            }
          </button>

          <button
            type="button"
            disabled={!episode || !hasNext}
            className={styles.playNextButton}
            onClick={playNext}
          >
            <img src="/play-next.svg" alt="Reproduzir proximo" />
          </button>

          <button
            type="button"
            disabled={!episode}
            className={isLooping ? styles.isActive : ''}
            onClick={toggleLoop}
          >
            <img src="/repeat.svg" alt="Repetir podcast" />
          </button>
        </div>
      </footer>
    </div>
  );
}
