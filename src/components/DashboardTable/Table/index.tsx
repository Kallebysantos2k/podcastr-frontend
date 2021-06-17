import React from 'react';
import { Episode } from '../../../models/Episode';
import styles from './styles.module.scss';
import DashboardTableItem from '../TableItem';

interface DashboardTableProps {
  episodes: [Episode];
}

export default function DashboardTable({ episodes }: DashboardTableProps) {
  return (
    <section className={styles.episodesContainer}>
      <table cellSpacing={0}>
        <thead>
          <tr>
            <th />
            <th>Id</th>
            <th>Podcast</th>
            <th>Data</th>
            <th>Duration</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {episodes.map((episode) => (
            <DashboardTableItem
              key={episode.id}
              episode={episode}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}
