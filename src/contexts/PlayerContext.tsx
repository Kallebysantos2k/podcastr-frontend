import { createContext, ReactNode, useState } from 'react';
import { Episode } from '../models/Episode';

interface PlayerContextData {
  episodeList: Episode[],
  currentEpisodeIndex: number,
  play: (episode: Episode) => void,
}

interface PlayerContextProviderProps {
  children: ReactNode,
}

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    console.log(episode);
  }

  return (
    <PlayerContext.Provider value={{
      episodeList,
      currentEpisodeIndex,
      play,
    }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
