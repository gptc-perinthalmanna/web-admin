import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export default function <T>(
  callBack: (req: NextApiRequest, res: NextApiResponse<T>) => Promise<{}>,
  roles: string[] = ["admin"]
) {
  async function eventsRoute(
    req: NextApiRequest,
    res: NextApiResponse<T | {}>
  ) {
    const user = req.session.user;
    if (!user || user.isLoggedIn === false) {
      res.status(401).end();
      return;
    }
    const found = roles.some((r) => user.role.includes(r));
    if (roles.length > 0 && !found && !roles.includes("any")) {
      res
        .status(403)
        .json({ error: "You are not authorized to access this page" });
      return;
    }
    try {
      const ret = await callBack(req, res);
      res.status(200).json(ret);
    } catch (error) {
      res.status(200).json(error);
    }
    return null;
  }

  return withIronSessionApiRoute(eventsRoute, sessionOptions);
}
