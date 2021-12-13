// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import { validation } from "helpers/validation";
import { createCommittee, WhosWho } from "server/customCommitties";

const userValidationSchema: yup.SchemaOf<WhosWho['value']['committees'][0]> = yup.object().shape({
  title: yup.string().min(3).required(),
  staffs_ids: yup.array().of(yup.object().shape({key: yup.string().required(), position: yup.string().required()})).min(1).required(),
}).noUnknown();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{} | { error: string }>
) {
  if (req.method === "POST") {
    const { isValid, errors, data } = await validation(
      userValidationSchema,
      req.body
    );
    console.log(data)
    console.log(errors)
    if (!isValid) {
      return res.status(400).json({ error: errors });
    }

    await createCommittee(data);

    return res.status(200).json({
      message: "success",
      data,
    });
  }
}
