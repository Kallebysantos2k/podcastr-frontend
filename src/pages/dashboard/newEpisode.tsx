import React, { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import {
  MdArrowBack, MdArrowForward, MdAudiotrack, MdImage,
} from 'react-icons/md';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import {
  displayErrorNotification,
  displayInfoNotification,
  displaySuccessNotification,
} from '../../helpers/notificationDisplayer';
import InputArea from '../../components/InputArea';
import styles from '../../styles/newEpisode.module.scss';
import api from '../../services/api';
import { User } from '../../models/User';
import { RequestValidationError } from '../../contexts/AuthContext';

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

  return {
    props: {},
  };
};

export default function newEpisode() {
  const { register, handleSubmit, control } = useForm();
  const [imageFile, setImageFile] = useState('');
  const [audioFile, setAudioFile] = useState('');

  async function handleNewEpisode(values) {
    displayInfoNotification({
      title: 'Novo Episódio',
      message: 'Os dados enviados estão a ser processados, em breve seu novo episódio estará disponivel',
    });

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('members', values.members);
    formData.append('description', values.description);
    formData.append('audio', values.audio[0]);
    formData.append('image', values.thumb[0]);

    api.post('/podcasts/', formData)
      .then(({ data }) => displaySuccessNotification({
        title: 'Novo episódio',
        message:
        `Episódio ${data.name} foi submetido com sucesso: ${process.env.NEXT_PUBLIC_HOST}/episodes/${data.id}`,
      }))
      .catch((req) => {
        const { message } = req?.response?.data as { message: [RequestValidationError] | string };

        if (typeof message === 'string') {
          return displayErrorNotification({
            title: 'Erro ao tentar criar episósdio',
            message,
          });
        }

        return message.forEach((error) => displayErrorNotification({
          title: `Erro no campo: ${error.property}`,
          message: `${error.description}`,
        }));
      });
  }

  function handleAudio(event: FormEvent<HTMLInputElement>) {
    const filepath = event.currentTarget.value;
    const filename = filepath.replace(/^.*[\\/]/, '');

    setAudioFile(filename);
  }

  function handleImage(event: FormEvent<HTMLInputElement>) {
    const filepath = event.currentTarget.value;
    const filename = filepath.replace(/^.*[\\/]/, '');

    setImageFile(filename);
  }

  return (
    <div className={styles.newEpisodeContainer}>
      <header>
        <Link href="/dashboard">
          <a>
            <MdArrowBack />
            <span>Voltar</span>
          </a>
        </Link>
        <h2>Adicionar episódio</h2>
      </header>

      <form onSubmit={handleSubmit(handleNewEpisode)}>
        <InputArea
          name="name"
          type="text"
          label="Titulo"
          control={control}
          otherProps={register('name')}
          required
        />

        <InputArea
          name="description"
          type="text"
          label="Descrição"
          control={control}
          otherProps={register('description')}
          required
        />

        <InputArea
          name="members"
          type="text"
          label="Participantes"
          control={control}
          otherProps={register('members')}
          required
        />

        <div className={styles.uploadButtons}>
          <label className={audioFile ? styles.isUploadActive : ''}>
            <div>
              <span>
                {audioFile || 'Ficheiro de Audio'}
              </span>
              <MdAudiotrack />
            </div>
            <input
              name="audio"
              type="file"
              accept="audio/mpeg, audio/ogg, audio/wavpack"
              required
              onInput={handleAudio}
              {...register('audio')}
            />
          </label>

          <label className={imageFile ? styles.isUploadActive : ''}>
            <div>
              <span>
                {imageFile || 'Miniatura'}
              </span>
              <MdImage />
            </div>
            <input
              name="thumb"
              type="file"
              accept="image/png, image/jpeg"
              required
              onInput={handleImage}
              {...register('thumb')}
            />
          </label>
        </div>

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
