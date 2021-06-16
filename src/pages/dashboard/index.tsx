import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Episode, parseToEpisode } from '../../models/Episode';
import { User } from '../../models/User';
import api from '../../services/api';

interface DashboardProps {
  allEpisodes: [Episode]
}

export const getServerSideProps: GetServerSideProps<DashboardProps> = async (ctx) => {
  const { 'podcastr.token': token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  api.defaults.headers.Authorization = `Bearer ${token}`;

  const { data: user } = await api.get('/user') as { data: User };
  const isAdmin = !!user?.roles.filter((role) => role === 'ROLE_ADMIN')[0];

  if (!isAdmin) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const { data: podcasts } = await api.get('podcast/');
  const episodes: [Episode] = podcasts.map(parseToEpisode);
  const allEpisodes = episodes.sort((a, b) => b.id - a.id);

  return {
    props: {
      allEpisodes,
    },
  };
};

export default function Dashboard({ allEpisodes }: DashboardProps) {
  const [episodes, setEpisodes] = useState(allEpisodes);

  return (
    <div>
      <section>
        <h2>Todos episodios</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th />
              <th>Id</th>
              <th>Podcast</th>
              <th>Data</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {episodes.map((episode) => (
              <tr key={episode.id}>
                <td>
                  <Image
                    width={120}
                    height={120}
                    src={episode.thumbnail}
                    alt={episode.name}
                  />
                </td>

                <td>{episode.id}</td>

                <td>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.name}</a>
                  </Link>
                </td>

                <td>{episode.publishedAt}</td>
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
