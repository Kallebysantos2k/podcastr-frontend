import { GetServerSideProps } from 'next';

interface UpdateEpisodeProps {
  id: number;
}

export const getServerSideProps: GetServerSideProps<UpdateEpisodeProps> = async (ctx) => {
  const { id } = ctx.params;

  return {
    props: {
      id: Number(id),
    },
  };
};

export default function UpdateEpisode({ id }: UpdateEpisodeProps) {
  return (
    <div>
      <h2>Update Episode {id}</h2>
    </div>
  );
}
