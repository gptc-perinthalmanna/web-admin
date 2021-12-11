// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import { FacilityPageType } from "../../../../server/db";
import { validation } from "../../../../server/helper/validation";
import { createPage } from "../../../../server/pages";


const userValidationSchema: yup.SchemaOf<{}> = yup.object().shape({
 key: yup.string().required(),
 title: yup.string().min(3).required(),
 about: yup.string().min(40).required(),
 cover: yup.string().url().required(),
 staffs_ids: yup.array().of(yup.string().required()),
 photos_ids: yup.array().of(yup.string().required()).nullable(),
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
    const page: FacilityPageType = { ...data } as unknown as FacilityPageType;
    await createPage('facility', page);
    return res.status(200).json({
      message: "success",
      data,
    });
  }
}
