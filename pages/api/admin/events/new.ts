// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import { EventType } from "server/db";
import { validation } from "helpers/validation";
import { createEvent } from "server/pages";

const userValidationSchema: yup.SchemaOf<{}> = yup.object().shape({
  key: yup.string().default(function () {
    return new Date().getTime().toString();
  }),
  title: yup.string().min(3).required(),
  subtitle: yup.string().min(5),
  tags: yup.array().of(yup.string()).min(1).required(),
  image: yup.string().url().required(),
  date: yup.string().required(),
  type: yup.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{} | { error: string }>
) {
  console.log(req.body);
  
  if (req.method === "POST") {
    const { isValid, errors, data } = await validation(
      userValidationSchema,
      req.body
    );

    if (!isValid) {
      return res.status(400).json({ error: errors });
    }

    const file: EventType = {
      ...data,
    } as unknown as EventType;

    await createEvent(file);

    return res.status(200).json({
      message: "success",
      data,
    });
  }
}
