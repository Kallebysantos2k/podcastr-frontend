import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { Episode } from '../../../models/Episode';
import styles from './styles.module.scss';

interface DashboardTableItemProps {
  episode: Episode
}

export default function DashboardTableItem({ episode }: DashboardTableItemProps) {
  function handleClick() {
    console.log(episode.id);
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
        <button
          type="button"
          onClick={handleClick}
        >
          <span>
            <BsThreeDots />
          </span>
        </button>
      </td>
    </tr>
  );
}
