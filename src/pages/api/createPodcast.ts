import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import { File } from 'formidable';
import { parseFile } from 'music-metadata';

import {
  handleRequestForm, IStoredItem, storeFile, storeFolder,
} from '../../helpers/UploadHelper';

const APIURL = 'http://localhost:8000';

interface ICreatePodcastInput {
  name: string,
  members: string,
  description: string,
}

interface StoredPodcastFiles {
  storedAudio: IStoredItem,
  storedThumbnail: IStoredItem
}

interface Podcast {
  id: string,
  name: string,
  members: string,
  duration: string,
  description: string,
  publishedAt: string,
  audioId?: string,
  audio?: string,
  thumbId?: string,
  thumbnail?: string,
}

export const config = {
  api: {
    bodyParser: false,
  },
};

async function parsePodcastResponseData(data: any) {
  return {
    id: data.id,
    name: data.name,
    members: data.members,
    duration: data.duration,
    description: data.description,
    publishedAt: data.publishedAt,
    audioId: data.fileId,
    audio: data.fileUrl,
    thumbId: data.thumbnailId,
    thumbnail: data.thumbnailUrl,
  };
}

async function postPodcast(data: ICreatePodcastInput, duration: number): Promise<Podcast> {
  const response = await axios.post(`${APIURL}/podcast/`, {
    name: data.name,
    members: data.members,
    description: data.description,
    duration,
  });

  return parsePodcastResponseData(response.data);
}

async function putPodcastFiles(id: string, files: StoredPodcastFiles): Promise<Podcast> {
  const response = await axios.put(`${APIURL}/podcast/${id}`, {
    fileId: files.storedAudio.id,
    fileUrl: files.storedAudio.location,
    thumbnailId: files.storedThumbnail.id,
    thumbnailUrl: files.storedThumbnail.location,
  });

  return parsePodcastResponseData(response.data);
}

async function storePodcastFiles(
  audio: File, thumb: File, folderName: string,
): Promise<StoredPodcastFiles> {
  const storedFolder = await storeFolder(`/${folderName}`);

  const storedAudio = await storeFile({
    localPath: audio.path,
    remotePath: `${storedFolder.location}/audio.mp3`,
  });

  const storedThumbnail = await storeFile({
    localPath: thumb.path,
    remotePath: `${storedFolder.location}/thumbnail.png`,
  });

  return { storedAudio, storedThumbnail };
}

export default async function createPodcast(req: VercelRequest, res: VercelResponse) {
  const data = await handleRequestForm(req);
  const input = data.fields as unknown as ICreatePodcastInput;
  const audio = data.files.audio as File;
  const thumb = data.files.thumb as File;

  console.log(data);

  const audioMetadata = await parseFile(audio.path);
  const { duration } = audioMetadata.format;

  if (audio.type !== 'audio/mpeg') return res.status(400).json({ error: 'Invalid audio format' });

  /* if (thumb.type !== 'image/png')
  return res.status(400).json({ error: 'Invalid thumbnail format' }); */

  try {
    const postedPodcast = await postPodcast(input, duration);
    const folderName = postedPodcast.id;
    const storedFiles = await storePodcastFiles(audio, thumb, folderName);

    const result = await putPodcastFiles(postedPodcast.id, storedFiles);

    return res.json({ result });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ error: 'Nao foi possivel criar o podcast' });
  }
}
