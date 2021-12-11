import { NextApiRequest, NextApiResponse } from "next";
import { getAllNews } from "../../../server/newsAndMedia";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{} | { error: string }>
  ) {
    if (req.method === "GET") {
      const news = await getAllNews();
      if (news) {
        res.status(200).json(news);
      } else {
        return error(res);
      }
    }
  }
  
  function error(res: NextApiResponse<{} | { error: string }>) {
    res.status(404).json({
      error: "News not found",
    });
  }