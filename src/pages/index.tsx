import React from 'react';
import { GetStaticProps } from 'next';
import api from '../services/api';
import { Episode, parseToEpisode } from '../models/Episode';

interface HomeProps {
  episodes: Episode[],
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { data } = await api.get('podcast/');

  const parsedData: Episode[] = data.map(parseToEpisode);
  const episodes = parsedData.sort((a, b) => b.id - a.id);

  return {
    props: {
      episodes,
    },
    revalidate: 60 * 2,
  };
};

export default function Home({ episodes }: HomeProps) {
  return (
    <div>
      <h1>Episodes🔥</h1>
      <p>{JSON.stringify(episodes)}</p>
    </div>
  );
}
