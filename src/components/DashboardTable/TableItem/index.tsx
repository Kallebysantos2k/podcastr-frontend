import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { MdDelete, MdEdit } from 'react-icons/md';
import { displayErrorNotification, displaySuccessNotification } from '../../../helpers/notificationDisplayer';
import { Episode } from '../../../models/Episode';
import api from '../../../services/api';
import styles from './styles.module.scss';

interface DashboardTableItemProps {
  episode: Episode
}

export default function DashboardTableItem({ episode }: DashboardTableItemProps) {
  const [isActive, setIsActive] = useState(false);

  function toogleIsActive() {
    setIsActive(!isActive);
  }

  function deleteEpisode() {
    api.delete(`/podcast/${episode.id}`)
      .then(() => displaySuccessNotification({
        title: 'Remover episódio',
        message: 'O episódio selecionado foi removido com sucesso',
      }))
      .catch((error) => displayErrorNotification({
        title: 'Remover episódio',
        message: `Não foi possível remover o episódio selecionado ${error}`,
      }));
    Router.reload();
  }

  return (
    <tr className={styles.episodeContainer}>
      <td className={styles.episodeThumbnail}>
        <Image
          width={120}
          height={120}
          src={episode.thumbnail}
          alt={episode.name}
        />
      </td>

      <td>{episode.id}</td>

      <td>
        <Link href={`/episodes/${episode.id}`}>
          <a>{episode.name}</a>
        </Link>
      </td>

      <td>{episode.publishedAt}</td>
      <td>{episode.timeString}</td>
      <td>
        <div
          className={styles.episodeOptionsContainer}
          onMouseLeave={() => setIsActive(false)}
        >
          <button
            type="button"
            onClick={toogleIsActive}
            className={isActive ? styles.isActive : ''}
          >
            <span>
              <BsThreeDots />
            </span>
          </button>

          {
            isActive && (
              <nav>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={() => console.log('ok')}
                >
                  <MdEdit />
                </span>

                <span
                  role="button"
                  tabIndex={-1}
                  onClick={deleteEpisode}
                >
                  <MdDelete />
                </span>
              </nav>
            )
          }
        </div>
      </td>
    </tr>
  );
}
