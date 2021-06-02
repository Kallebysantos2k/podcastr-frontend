import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export interface Episode {
  id: string,
  name: string,
  members: string,
  duration: number,
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
    description: data.description,
    publishedAt: format(parseISO(data.publishedAt), 'd MMM yy', { locale: ptBR }),
    audio: data.fileUrl,
    thumbnail: data.thumbnailUrl,
  };
}
