import { v4 as uuidv4 } from "uuid";

import { filesDB, FileType, imagesDB, ImageType, deletedDB } from "./db";

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

export async function getAllFIles() {
  const res = await filesDB.fetch();
  return res.items as unknown as FileType[] | null;
}

export async function deleteFile(key: string) {
  let deleted = await filesDB.get(key);
  if (!deleted) return null;
  await deletedDB.put({...deleted, key: uuidv4()})
  await filesDB.delete(key);
  return true
}

export async function createImage(file: {}) {
  const res = await imagesDB.put(file);
  return res as unknown as ImageType | null;
}

export async function getImage(key: string) {
  const res = await imagesDB.get(key);
  return res as unknown as ImageType | null;
}

export async function getAllImages() {
  const res = await imagesDB.fetch();
  return res.items as unknown as ImageType[] | null;
}