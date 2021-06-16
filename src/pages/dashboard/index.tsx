import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
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
  return (
    <div>
      {JSON.stringify(allEpisodes)}
    </div>
  );
}
