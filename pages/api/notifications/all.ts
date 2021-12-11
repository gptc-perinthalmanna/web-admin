// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { NotificationType } from "../../../server/db";
import { getAllNotifications } from "../../../server/notifications";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NotificationType[] | { error: string }>
) {
  if (req.method === "GET") {
    const notifications = await getAllNotifications();
    if (notifications) {
      res.status(200).json(notifications);
    } else {
      return error(res);
    }
  }
}

function error(res: NextApiResponse<NotificationType[] | { error: string }>) {
  res.status(404).json({
    error: "Notifications not found",
  });
}
