import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { User } from '../../models/User';
import api from '../../services/api';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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

  const { data } = await api.get('/user') as { data: User };
  const isAdmin = !!data?.roles.filter((role) => role === 'ROLE_ADMIN')[0];

  if (!isAdmin) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
