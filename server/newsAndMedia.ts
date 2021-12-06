import { newsAndMediaDB, NewsMediaType } from "./db";

export async function getAllNews() {
  const res = await newsAndMediaDB.fetch({},{limit:10});
  return res.items as unknown as NewsMediaType[] | null;
}

export async function createNews(news: {}) {
    const res = await newsAndMediaDB.put(news);
    return res;
}