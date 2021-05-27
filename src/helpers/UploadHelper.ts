import { VercelRequest } from '@vercel/node';
import {
  Fields, Files, formidable,
} from 'formidable';

export interface IRequestForm {
  fields: Fields,
  files: Files
}

export async function handleRequestForm(request: VercelRequest): Promise<IRequestForm> {
  return new Promise((resolve, reject) => {
    const form = formidable({
      uploadDir: __dirname,
      multiples: true,
    });

    form.parse(request, (err, fields, files) => {
      if (err) reject(err);

      resolve({ fields, files });
    });
  });
}
