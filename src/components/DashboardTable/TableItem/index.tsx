import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Episode } from '../../../models/Episode';
import styles from './styles.module.scss';

interface DashboardTableItemProps {
  episode: Episode
}

export default function DashboardTableItem({ episode }: DashboardTableItemProps) {
  const [isActive, setIsActive] = useState(false);

  function toogleIsActive() {
    setIsActive(!isActive);
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
          // onMouseLeave={() => setIsActive(false)}
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
                  onClick={() => console.log('ok')}
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
