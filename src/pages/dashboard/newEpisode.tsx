import React, { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import {
  MdArrowBack, MdArrowForward, MdAudiotrack, MdImage,
} from 'react-icons/md';
import InputArea from '../../components/InputArea';
import styles from '../../styles/newEpisode.module.scss';

export default function newEpisode() {
  const { register, handleSubmit, control } = useForm();
  const [imageFile, setImageFile] = useState('');
  const [audioFile, setAudioFile] = useState('');

  function handleNewEpisode(data) {
    console.log(data);
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
          name="title"
          type="text"
          label="Titulo"
          control={control}
          otherProps={register('title')}
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
