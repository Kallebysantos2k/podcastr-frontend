import { GetStaticPaths, GetStaticProps } from 'next';
import { Episode, parseToEpisode } from '../../models/Episode';
import api from '../../services/api';

interface EpisodeProps {
  episode: Episode,
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
});

export const getStaticProps: GetStaticProps<EpisodeProps> = async (ctx) => {
  const { id } = ctx.params;
  const { data } = await api.get(`podcast/${id}`);

  return {
    props: {
      episode: parseToEpisode(data),
    },
  };
};

export default function EpisodePage({ episode }: EpisodeProps) {
  return (
    <div>
      <h2>{episode.name}</h2>
    </div>
  );
}
