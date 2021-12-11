import type { NextApiRequest, NextApiResponse } from "next";
import { getCampus } from "server/pages";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{} | { error: string }>
) {
  if (req.method === "GET") {
    const { id } = req.query;
    if (typeof id !== "string") return error(res);
    const campusPage = await getCampus(id);
    if (campusPage) {
      res.status(200).json(campusPage);
    } else {
      return error(res);
    }
  } else {
    res.status(404).json({
      error: "Method not allowed",
    });
  }
}

function error(res: NextApiResponse<{} | { error: string }>) {
  res.status(404).json({
    error: "Campus not found",
  });
}
