import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import React, { useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { DashboardTable } from '../../components/DashboardTable';
import { Episode, parseToEpisode } from '../../models/Episode';
import { User } from '../../models/User';
import api from '../../services/api';
import styles from '../../styles/dashboard.module.scss';

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

  /*   useEffect(() => {
    const filter = episodes.filter((episode) => episode.id === 13) as [Episode];
    setEpisodes(filter);
  }, []);

  */

  return (
    <div className={styles.dashboardContainer}>
      <header>
        <h2>Todos episodios</h2>
        <Link href="/dashboard/episode/new">
          <a>
            <BsPlus />
          </a>
        </Link>
      </header>

      <DashboardTable episodes={episodes} />
    </div>
  );
}
