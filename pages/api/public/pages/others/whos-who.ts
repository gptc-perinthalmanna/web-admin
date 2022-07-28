// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { UserType } from "server/db";
import { getOther } from "server/other";
import { getUser } from "server/users";

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
    let staffs: { [key: string]: UserType } = {};
    page.committees.forEach((committee) => {
      unresolvedpromises = committee.staffs_ids.map(async (staff_id) => {
        if (!("key" in staff_id)) return null;
        if (staffs[staff_id.key]) return null;
        try {
          const user = await getUser(staff_id.key);
          if (user) {
            staffs[user?.key] = { ...user, role: [] };
            return user;
          }
        } catch (e) {
          return null;
        }
        return null;
      });
    });

    if (unresolvedpromises) await Promise.all(unresolvedpromises);
    res.status(200).json({ ...page, staffs });
  }
}
