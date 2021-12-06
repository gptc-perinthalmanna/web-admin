import { filesDB, FileType, imagesDB, ImageType } from "./db";

export async function getFile(key: string) {
  const res = await filesDB.get(key);
  return res as unknown as FileType | null;
}

export async function getFiles(tag: string) {
    const res = await filesDB.fetch({"tags?contains": tag});
    return res.items as unknown as FileType[] | null;
}

export async function createFile(file: {}) {
  const res = await filesDB.put(file);
  return res as unknown as FileType | null;
}


export async function createImage(file: {}) {
  const res = await imagesDB.put(file);
  return res as unknown as ImageType | null;
}

export async function getImage(key: string) {
  const res = await imagesDB.get(key);
  return res as unknown as ImageType | null;
}