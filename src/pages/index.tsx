import React from 'react';
import { GetStaticPropsResult } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import api from '../services/api';
import styles from '../styles/home.module.scss';
import { Episode, parseToEpisode } from '../models/Episode';
import { usePlayer } from '../contexts/PlayerContext';

interface HomeProps {
  latestEpisodes: [Episode],
  allEpisodes: [Episode],
}

export async function getStaticProps(): Promise<GetStaticPropsResult<HomeProps>> {
  const { data } = await api.get('podcast/');

  const parsedData = data.map(parseToEpisode);
  const episodes = parsedData.sort((a, b) => b.id - a.id);

  return {
    props: {
      latestEpisodes: episodes.slice(0, 2),
      allEpisodes: episodes.slice(2, episodes.length),
    },
    revalidate: 60 * 2,
  };
}

export default function Home({ allEpisodes, latestEpisodes }: HomeProps) {
  const { playList } = usePlayer();

  const episodesList = [...latestEpisodes, ...allEpisodes];

  return (
    <div className={styles.homeContainer}>
      <section className={styles.latestEpisodesContainer}>
        <h2>Últimos lançamentos</h2>

        <ul>
          { latestEpisodes.map((episode, index) => (
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
                <Link href={`/episodes/${episode.id}`}>
                  <a>{episode.name}</a>
                </Link>

                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.timeString}</span>
              </div>

              <button type="button" onClick={() => playList(episodesList, index)}>
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
            <tr>
              <th />
              <th>Podcast</th>
              <th>Participantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {allEpisodes.map((episode, index) => (
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
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.name}</a>
                  </Link>
                </td>

                <td className={styles.episodeInfo}>
                  {episode.members}
                </td>

                <td>{episode.publishedAt}</td>
                <td>{episode.timeString}</td>
                <td>
                  <button type="button" onClick={() => playList(episodesList, index + latestEpisodes.length)}>
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
