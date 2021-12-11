// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import { UserType } from "../../../server/db";
import { updateAvatarUser } from "../../../server/users";
import { validation } from "../../../server/helper/validation";

const userValidationSchema: yup.SchemaOf<{}> = yup.object().shape({
  key: yup.string().required(),
  avatar: yup.string().url().required(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{} | { error: string }>
) {
  if (req.method === "POST") {
    const { isValid, errors, data } = await validation(
      userValidationSchema,
      req.body
    );
    if (!isValid) {
      return res.status(400).json({ error: errors });
    }
    const user: UserType = { ...data } as unknown as UserType;
    if (!user.avatar)
      return res.status(400).json({ error: "Avatar is required" });
    await updateAvatarUser(user.key, user.avatar);

    return res.status(200).json({
      message: "success",
      data,
    });
  }
}
