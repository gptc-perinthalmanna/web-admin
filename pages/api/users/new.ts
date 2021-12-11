// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { UserType } from "../../../server/db";
import { createUser } from "../../../server/users";
import bcrypt from "bcryptjs";
import { validation } from "../../../server/helper/validation";

const userValidationSchema: yup.SchemaOf<{}> = yup.object().shape({
  key: yup.string().default(function () {
    return uuidv4();
  }),
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  designation: yup.string().required(),
  role: yup.string().default(""),
  department: yup.string().required(),
  createdAt: yup.number().default(function () {
    return Date.now();
  }),
  updatedAt: yup.number().default(function () {
    return Date.now();
  }),
  phone: yup.string().required(),
  address: yup.string().required(),
  socialLinks: yup.object().shape({
    facebook: yup.string().url(),
    linkedin: yup.string().url(),
    instagram: yup.string().url(),
    whatsapp: yup.string(),
  }),
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
    user.role = "staff";
    user.password = await bcrypt.hash(user.password, 10);

    await createUser(user);

    return res.status(200).json({
      message: "success",
      data,
    });
  }
}
