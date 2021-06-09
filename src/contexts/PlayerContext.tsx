import { createContext, ReactNode, useState } from 'react';
import { Episode } from '../models/Episode';

interface PlayerContextData {
  isPlaying: boolean,
  episodeList: Episode[],
  currentEpisodeIndex: number,
  play: (episode: Episode) => void,
  playNext: () => void,
  playPrevious: () => void,
  playList: (list: Episode[], index: number) => void,
  setPlayState: (state: boolean) => void,
  togglePlay: () => void,
}

interface PlayerContextProviderProps {
  children: ReactNode,
}

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
    console.log(episode);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function playNext() {
    const next = currentEpisodeIndex + 1;

    if (next >= episodeList.length) return;

    setCurrentEpisodeIndex(next);
  }

  function playPrevious() {
    const previous = currentEpisodeIndex - 1;

    if (previous < 0) return;

    setCurrentEpisodeIndex(previous);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayState(state: boolean) {
    setIsPlaying(state);
  }

  return (
    <PlayerContext.Provider value={{
      isPlaying,
      episodeList,
      currentEpisodeIndex,
      play,
      playNext,
      playPrevious,
      playList,
      setPlayState,
      togglePlay,
    }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
