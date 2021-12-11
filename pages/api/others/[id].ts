import { NextApiRequest, NextApiResponse } from "next";
import { getOther } from "../../../server/other";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{} | { error: string }>
  ) {
    if (req.method === "GET") {
      const { id } = req.query;
      if (typeof id !== "string") return error(res);
      const other = await getOther(id);
      if (other) {
        res.status(200).json(other);
      } else {
        return error(res);
      }
    }
  }
  
  function error(res: NextApiResponse<{} | { error: string }>) {
    res.status(404).json({
      error: "Item not found",
    });
  }