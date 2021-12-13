// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import { validation } from "helpers/validation";
import { setHighlightedEvent } from "server/customHighlightedEvent";

const userValidationSchema: yup.SchemaOf<{}> = yup.object().shape({
  event_id: yup.string().min(10).required(),
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

    await setHighlightedEvent(data.event_id);

    return res.status(200).json({
      message: "success",
      data,
    });
  }
}
