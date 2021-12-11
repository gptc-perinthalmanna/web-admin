// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import { NewsMediaType } from "../../../server/db";
import { createNews } from "../../../server/newsAndMedia";
import { validation } from "../../../server/helper/validation";

const userValidationSchema: yup.SchemaOf<{}> = yup.object().shape({
  key: yup.string().default(function () {
    return new Date().getTime().toString();
  }),
  title: yup.string().min(3).required(),
  author: yup.string().min(3).required(),
  description: yup.string().min(40).required(),
  date: yup.string().min(3).required(),
  url: yup.string().url(),
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

    const news: NewsMediaType = {
      ...data,
    } as unknown as NewsMediaType;

    await createNews(news);

    return res.status(200).json({
      message: "success",
      data,
    });
  }
}
