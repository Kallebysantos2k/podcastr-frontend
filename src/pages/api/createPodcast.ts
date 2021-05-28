import { VercelRequest, VercelResponse } from '@vercel/node';
import { File } from 'formidable';

import { handleRequestForm, storeFile } from '../../helpers/UploadHelper';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function createPodcast(req: VercelRequest, res: VercelResponse) {
  const data = await handleRequestForm(req);
  const audio = data.files.audio as File;

  const uploaded = await storeFile({
    localPath: audio.path,
    remotePath: `/${audio.name}`,
  });

  return res.json({ uploaded });
}
