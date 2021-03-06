import { GetServerSideProps } from 'next';
import Head from 'next/head';
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

  const { data: user } = await api.get('/users') as { data: User };
  const isAdmin = user?.isAdmin;

  if (!isAdmin) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const { data: podcasts } = await api.get('podcasts/');
  const episodes: [Episode] = podcasts.map(parseToEpisode);
  const allEpisodes = episodes.sort((a, b) => b.id - a.id);

  return {
    props: {
      allEpisodes,
    },
  };
};

export default function Dashboard({ allEpisodes }: DashboardProps) {
  const [episodes] = useState(allEpisodes);

  /*   useEffect(() => {
    const filter = episodes.filter((episode) => episode.id === 13) as [Episode];
    setEpisodes(filter);
  }, []);

  */

  return (
    <div className={styles.dashboardContainer}>
      <Head>
        <title>Dashboard | Podcastr</title>
      </Head>

      <header>
        <h2>Todos episodios</h2>
        <Link href="/dashboard/newEpisode">
          <a>
            <BsPlus />
          </a>
        </Link>
      </header>

      <DashboardTable episodes={episodes} />
    </div>
  );
}
