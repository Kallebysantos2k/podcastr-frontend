import { config } from 'dotenv';
import { VercelRequest } from '@vercel/node';
import { Fields, Files, IncomingForm } from 'formidable';
import { Dropbox } from 'dropbox';
import fs from 'fs';

config();

export interface IRequestForm {
  fields: Fields,
  files: Files
}

export interface IStoredItem {
  id: string,
  name: string,
  location: string,
}

export interface StoreFileProps {
  localPath: string,
  remotePath: string,
}

export async function handleRequestForm(request: VercelRequest): Promise<IRequestForm> {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(request, (err, fields, files) => {
      if (err) reject(err);

      resolve({ fields, files });
    });
  });
}

export async function storeFile({ localPath, remotePath }: StoreFileProps): Promise<IStoredItem> {
  return new Promise((resolve, reject) => {
    const dropbox = new Dropbox({
      accessToken: process.env.DROPBOX_TOKEN,
    });

    fs.readFile(localPath, async (readError, contents) => {
      if (readError) reject(readError);

      dropbox.filesUpload({
        contents,
        path: remotePath,
        autorename: true,
        strict_conflict: true,
      })
        .then((uploaded) => {
          dropbox.sharingCreateSharedLinkWithSettings({
            path: uploaded.result.path_lower,
          })
            .then(({ result }) => resolve({
              id: result.id,
              name: result.name,
              location: result.url.replace('?dl=0', ''),
            }))
            .catch((shareError) => reject(shareError));
        })
        .catch((uploadError) => reject(uploadError));
    });
  });
}

export async function storeFolder(path: string): Promise<IStoredItem> {
  return new Promise((resolve, reject) => {
    const dropbox = new Dropbox({
      accessToken: process.env.DROPBOX_TOKEN,
    });

    dropbox.filesCreateFolderV2({ path })
      .then(({ result }) => resolve({
        id: result.metadata.id,
        name: result.metadata.name,
        location: result.metadata.path_lower,
      }))
      .catch((folderError) => reject(folderError));
  });
}
