// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import { NotificationType } from "../../../server/db";
import { createNotificiations } from "../../../server/notifications";

// helper
import { validation } from "../../../server/helper/validation";

const userValidationSchema: yup.SchemaOf<{}> = yup.object().shape({
  key: yup.string().default(() => (2e12 - new Date().getTime()).toString()),
  title: yup.string().min(3).required(),
  link: yup.string().url(),
  createdAt: yup.number().default(() => Date.now()),
  author: yup.string().min(3),
  tags: yup.array(yup.string().required()).required(),
  expired: yup.boolean().default(() => false),
  deleted: yup.boolean().default(() => false),
  expiryDate: yup.number().min(33),
  category: yup.string().min(3),
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

    const notifications: NotificationType = {
      ...data,
    } as unknown as NotificationType;

    await createNotificiations(notifications);

    return res.status(200).json({
      message: "success",
      data,
    });
  }
}
