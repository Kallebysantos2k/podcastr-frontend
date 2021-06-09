import {
  createContext, ReactNode, useContext, useState,
} from 'react';
import { Episode } from '../models/Episode';

interface PlayerContextData {
  isPlaying: boolean,
  isLooping: boolean,
  isShuffling: boolean,
  episodeList: Episode[],
  currentEpisodeIndex: number,
  play: (episode: Episode) => void,
  playNext: () => void,
  playPrevious: () => void,
  playList: (list: Episode[], index: number) => void,
  setPlayState: (state: boolean) => void,
  togglePlay: () => void,
  toggleLoop: () => void,
  toggleShuffle: () => void,
  hasNext: boolean,
  hasPrevious: boolean,
}

interface PlayerContextProviderProps {
  children: ReactNode,
}

export const PlayerContext = createContext({} as PlayerContextData);

export const usePlayer = () => useContext(PlayerContext);

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

  const hasNext = (currentEpisodeIndex + 1) < episodeList.length;
  const hasPrevious = currentEpisodeIndex > 0;

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function playNext() {
    if (!isShuffling && !hasNext) return;

    const nextEpisodeIndex = (isShuffling)
      ? Math.floor(Math.random() * episodeList.length)
      : currentEpisodeIndex + 1;

    setCurrentEpisodeIndex(nextEpisodeIndex);
  }

  function playPrevious() {
    if (!hasPrevious) return;

    setCurrentEpisodeIndex(currentEpisodeIndex - 1);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function setPlayState(state: boolean) {
    setIsPlaying(state);
  }

  return (
    <PlayerContext.Provider value={{
      isPlaying,
      isLooping,
      isShuffling,
      episodeList,
      currentEpisodeIndex,
      play,
      playNext,
      playPrevious,
      playList,
      setPlayState,
      togglePlay,
      toggleLoop,
      toggleShuffle,
      hasNext,
      hasPrevious,
    }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
