// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import { OtherType } from "../../../server/db";
import { validation } from "../../../server/helper/validation";
import { createOther } from "../../../server/other";

const userValidationSchema: yup.SchemaOf<{}> = yup.object().shape({
  key: yup.string().min(3).required(),
  value: yup.object().required(),
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

    const other: OtherType = {
      ...data,
    } as unknown as OtherType;

    await createOther(other);

    return res.status(200).json({
      message: "success",
      data,
    });
  }
}
