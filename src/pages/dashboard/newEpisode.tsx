import React from 'react';
import { useForm } from 'react-hook-form';
import {
  MdArrowBack, MdArrowForward, MdAudiotrack, MdImage,
} from 'react-icons/md';
import InputArea from '../../components/InputArea';
import styles from '../../styles/newEpisode.module.scss';

export default function newEpisode() {
  const { register, handleSubmit, control } = useForm();

  function handleNewEpisode(data) {
    console.log(data);
  }

  return (
    <div className={styles.newEpisodeContainer}>

      <button type="button">
        <MdArrowBack />
      </button>
      <h2>Adicionar episódio</h2>

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
          <label>
            <div>
              Ficheiro de Audio
              <MdAudiotrack />
            </div>
            <input
              name="audio"
              type="file"
              required
              {...register('audio')}
            />
          </label>

          <label>
            <div>
              Miniatura
              <MdImage />
            </div>
            <input
              name="thumb"
              type="file"
              required
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
