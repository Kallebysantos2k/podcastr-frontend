import { VercelRequest, VercelResponse } from '@vercel/node';
import { Dropbox, Error, files } from 'dropbox';
import { File, IncomingForm } from 'formidable';

import fs from 'fs';
// import { handleRequestForm } from '../../helpers/UploadHelper';

const token = 'L_vegPt8JHIAAAAAAAAAAQzNfspnhmnYOSD3Fhy-auaUUCzm57fK9cgPwLnBf3n_';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function createPodcast(req: VercelRequest, res: VercelResponse) {
  const form = new IncomingForm();

  form.parse(req, (err, fields, filess) => {
    console.log('fields:', fields);
    console.log('files:', filess);

    const { audio } = filess;
    const file = audio as File;

    const dropbox = new Dropbox({
      accessToken: token,
    });

    console.log(file.path);
    fs.readFile(file.path, (erro, contents) => {
      if (erro) console.error(erro);

      console.log(contents);
      // This uploads basic.js to the root of your dropbox
      dropbox.filesUpload({
        contents,
        path: `/${file.name}`,
        autorename: true,
        strict_conflict: true,
      })
        .then((response: any) => {
          console.log(response);
        })
        .catch((uploadErr: Error<files.UploadError>) => {
          console.log(uploadErr);
        });
    });
  });

  return res.json('ok');
}
