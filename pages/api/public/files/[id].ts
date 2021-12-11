import { NextApiRequest, NextApiResponse } from "next";
import { getFile } from "../../../server/files";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{} | { error: string }>
  ) {
    if (req.method === "GET") {
      const { id } = req.query;
      if (typeof id !== "string") return error(res);
      const file = await getFile(id);
      if (file) {
        res.status(200).json(file);
      } else {
        return error(res);
      }
    }
  }
  
  function error(res: NextApiResponse<{} | { error: string }>) {
    res.status(404).json({
      error: "File not found",
    });
  }