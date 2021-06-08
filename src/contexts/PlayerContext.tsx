import { createContext, ReactNode, useState } from 'react';
import { Episode } from '../models/Episode';

interface PlayerContextData {
  isPlaying: boolean,
  episodeList: Episode[],
  currentEpisodeIndex: number,
  play: (episode: Episode) => void,
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

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  return (
    <PlayerContext.Provider value={{
      isPlaying,
      episodeList,
      currentEpisodeIndex,
      play,
      togglePlay,
    }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
