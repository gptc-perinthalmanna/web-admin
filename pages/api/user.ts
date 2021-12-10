import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { UserType } from "server/db";
import { getUser } from "server/users";

export interface User extends UserType {
  isLoggedIn: boolean;
}

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse<User | {}>) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    const user = await getUser(req.session.user.key);
    if (!user) {
      return res.json({
        isLoggedIn: false,
      });
    }

    res.json({
      ...user,
      isLoggedIn: true,
    });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
}
