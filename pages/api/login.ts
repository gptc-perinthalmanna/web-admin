import bcrypt from "bcryptjs";

import type { User } from "./user";

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { getUserbyUsername } from "server/users";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body)
  const { username, password } = await req.body;
  try {
    const userDB = await getUserbyUsername(username);
    const isValid = await bcrypt.compare(password, userDB.password);
    if (!isValid) {
      throw new Error("Invalid password");
    }

    const user = { isLoggedIn: true, ...userDB, password: "" } as User;
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
