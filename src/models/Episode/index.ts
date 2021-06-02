import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import convertDurationToTimeString from '../../helpers/convertDurationToTimeString';

export interface Episode {
  id: number,
  name: string,
  members: string,
  duration: number,
  timeString: string,
  description: string,
  publishedAt: string,
  audio: string,
  thumbnail: string,
}

export function parseToEpisode(data: any): Episode {
  return {
    id: data.id,
    name: data.name,
    members: data.members,
    duration: Number(data.duration),
    timeString: convertDurationToTimeString(Number(data.duration)),
    description: data.description,
    publishedAt: format(parseISO(data.publishedAt), 'd MMM yy', { locale: ptBR }),
    audio: data.fileUrl,
    thumbnail: data.thumbnailUrl,
  };
}
