// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { FacilityPageType } from "../../../../server/db";
import { getFacilities } from "../../../../server/pages";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{} | { error: string }>
) {
  if (req.method === "GET") {
    const { id } = req.query;
    if (typeof id !== "string") return error(res);
    const facilityPage = await getFacilities(id);
    if (facilityPage) {
      res.status(200).json(facilityPage);
    } else {
      return error(res);
    }
  }
}

function error(res: NextApiResponse<FacilityPageType | { error: string }>) {
  res.status(404).json({
    error: "Campus not found",
  });
}
