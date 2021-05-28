import { VercelRequest, VercelResponse } from '@vercel/node';
import { File } from 'formidable';
import { v5, v4 } from 'uuid';

import {
  handleRequestForm, storeFile, storeFolder,
} from '../../helpers/UploadHelper';

interface ICreatePodcastInput {
  name: string,
  members: string,
  description: string,
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function createPodcast(req: VercelRequest, res: VercelResponse) {
  const data = await handleRequestForm(req);
  const input = data.fields as unknown as ICreatePodcastInput;
  const audio = data.files.audio as File;
  const thumb = data.files.thumb as File;

  if (audio.type !== 'audio/mpeg') return res.status(400).json({ error: 'Invalid audio format' });

  if (thumb.type !== 'image/png') return res.status(400).json({ error: 'Invalid thumbnail format' });

  const folderName = v5(input.name, v4());
  const storedFolder = await storeFolder(`/${folderName}`);

  const storedAudio = await storeFile({
    localPath: audio.path,
    remotePath: `${storedFolder.location}/audio.mp3`,
  });

  const storedThumbnail = await storeFile({
    localPath: thumb.path,
    remotePath: `${storedFolder.location}/thumbnail.png`,
  });

  return res.json({ storedAudio, storedThumbnail });
}
