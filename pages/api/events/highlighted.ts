// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { EventType } from "../../../server/db";
import { getOther } from "../../../server/other";
import { getEvent } from "../../../server/pages";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventType | { error: string }>
) {
  if (req.method === "GET") {
    const highlightedEvent = await getOther("highlighted-event");
    const event = await getEvent(highlightedEvent?.event_id);

    if (event) {
      res.status(200).json(event);
    } else {
      return error(res);
    }
  }
}

function error(res: NextApiResponse<EventType | { error: string }>) {
  res.status(404).json({
    error: "Event not found",
  });
}
