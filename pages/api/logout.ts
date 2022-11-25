import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import useUser from "lib/useUser";
import { NextApiRequest, NextApiResponse } from "next";
import type { User } from "pages/api/user";

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

function logoutRoute(req: NextApiRequest, res: NextApiResponse<User | {}>) {
  // const { mutateUser } = useUser();
  req.session.destroy();
  // mutateUser(null);
  res.json({ isLoggedIn: false, key: "" });
}
