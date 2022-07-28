// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { UserType } from "server/db";
import { getOther } from "server/other";
import { getMultipleUsers, getUser } from "server/users";

interface Committee {
  title: string;
  staffs_ids: { key: string; position: string }[];
}

interface PageType {
  committees: Committee[];
  staffs: { [key: string]: UserType };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{} | { error: string }>
) {
  if (req.method === "GET") {
    const page = (await getOther("who-is-who")) as PageType;
    let unresolvedpromises: any;

    const staffList = new Set<string>();
    page.committees.forEach((committee) => {
      committee.staffs_ids.forEach((staff) => {
        staffList.add(staff.key);
      });
    });
    const staffs = await getMultipleUsers(Array.from(staffList.values()));

    if (unresolvedpromises) await Promise.all(unresolvedpromises);
    res.status(200).json({ ...page, staffs });
  }
}
