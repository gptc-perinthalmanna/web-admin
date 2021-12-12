import { NextApiRequest, NextApiResponse } from "next";
import { getNotification } from "server/notifications";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{} | { error: string }>
) {
  if (req.method === "GET") {
    const { id } = req.query;
    if (typeof id !== "string") return error(res);
    const notification = await getNotification(id);
    if (notification) {
      res.status(200).json(notification);
    } else {
      return error(res);
    }
  }
}

function error(res: NextApiResponse<any | { error: string }>) {
  res.status(404).json({
    error: "Notification not found",
  });
}
