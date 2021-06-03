import React from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import api from '../services/api';
import styles from '../styles/home.module.scss';
import { Episode, parseToEpisode } from '../models/Episode';

interface HomeProps {
  latestEpisodes: Episode[],
  allEpisodes: Episode[],
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { data } = await api.get('podcast/');

  const parsedData: Episode[] = data.map(parseToEpisode);
  const episodes = parsedData.sort((a, b) => b.id - a.id);

  return {
    props: {
      latestEpisodes: episodes.slice(0, 2),
      allEpisodes: episodes,
    },
    revalidate: 60 * 2,
  };
};

export default function Home({ allEpisodes, latestEpisodes }: HomeProps) {
  return (
    <div className={styles.homeContainer}>
      <section className={styles.latestEpisodesContainer}>
        <h2>Últimos lançamentos</h2>

        <ul>
          { latestEpisodes.map((episode) => (
            <li key={episode.id}>

              <div className={styles.latestEpisodeThumbnail}>
                <Image
                  width={192}
                  height={192}
                  src={episode.thumbnail}
                  alt={episode.name}
                />
              </div>

              <div className={styles.episodeDetails}>
                <a href="#">{episode.name}</a>
                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.timeString}</span>
              </div>

              <button type="button">
                <img src="/play-green.svg" alt="Reproduzir episodio" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.allEpisodesContainer}>
        <h2>Todos episodios</h2>

        <table cellSpacing={0}>
          <thead>
            <th />
            <th>Podcast</th>
            <th>Participantes</th>
            <th>Data</th>
            <th>Duração</th>
            <th />
          </thead>

          <tbody>
            {allEpisodes.map((episode) => (
              <tr key={episode.id}>
                <td className={styles.episodeThumbnail}>
                  <Image
                    width={120}
                    height={120}
                    src={episode.thumbnail}
                    alt={episode.name}
                  />
                </td>

                <td className={styles.episodeInfo}>
                  <a href="">{episode.name}</a>
                </td>

                <td className={styles.episodeInfo}>
                  {episode.members}
                </td>

                <td>{episode.publishedAt}</td>
                <td>{episode.timeString}</td>
                <td>
                  <button type="button">
                    <img src="/play-green.svg" alt="Reproduzir episodio" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
