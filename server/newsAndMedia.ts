import { v4 as uuidv4 } from "uuid";
import { newsAndMediaDB, NewsMediaType, deletedDB } from "./db";
export async function getAllNews() {
  const res = await newsAndMediaDB.fetch({},{limit:10});
  return res.items as unknown as NewsMediaType[] | null;
}

export async function createNews(news: {}) {
    return newsAndMediaDB.put(news);
}

export async function deleteNews(key: string) {
  let deleted = await newsAndMediaDB.get(key);
  if (!deleted) return null;
  await deletedDB.put({...deleted, key: uuidv4()})
  await newsAndMediaDB.delete(key);
  return true
}