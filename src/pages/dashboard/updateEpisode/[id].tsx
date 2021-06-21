import { GetServerSideProps } from 'next';
import React from 'react';
import Link from 'next/link';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';
import api from '../../../services/api';
import { Episode, parseToEpisode } from '../../../models/Episode';
import InputArea from '../../../components/InputArea';

interface UpdateEpisodeProps {
  episode: Episode
}

export const getServerSideProps: GetServerSideProps<UpdateEpisodeProps> = async (ctx) => {
  const { id } = ctx.params;

  const { data } = await api.get(`podcast/${id}`);

  return {
    props: {
      episode: parseToEpisode(data),
    },
  };
};

export default function UpdateEpisode({ episode }: UpdateEpisodeProps) {
  const { register, handleSubmit, control } = useForm();

  function handleUpdateEpisode(data) {
    console.log(data);
  }

  return (
    <div className={styles.updateEpisodeContainer}>
      <header>
        <Link href="/dashboard">
          <a>
            <MdArrowBack />
            <span>Voltar</span>
          </a>
        </Link>
        <h2>Editar episódio {episode.name}</h2>
      </header>

      <form onSubmit={handleSubmit(handleUpdateEpisode)}>
        <InputArea
          name="name"
          type="text"
          label="Titulo"
          control={control}
          defaultValue={episode.name}
          otherProps={register('name')}
          required
        />

        <InputArea
          name="description"
          type="text"
          label="Descrição"
          control={control}
          defaultValue={episode.description}
          otherProps={register('description')}
          required
        />

        <InputArea
          name="members"
          type="text"
          label="Participantes"
          control={control}
          defaultValue={episode.members}
          otherProps={register('members')}
          required
        />

        <footer>
          <button type="submit">
            <span>Confirmar</span>
            <MdArrowForward />
          </button>
        </footer>
      </form>
    </div>
  );
}
