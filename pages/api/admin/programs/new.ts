// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import { EventType } from "server/db";
import { validation } from "helpers/validation";
import { createEvent } from "server/pages";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { ProgramApiIn } from "lib/types";

const userValidationSchema: yup.SchemaOf<ProgramApiIn> = yup.object().shape({
  title: yup.string().min(3).required(),
  duration: yup.string().min(5),
  date: yup.string().min(5),
  logos: yup.array().of(yup.string()).required(),
  staffs: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      name: yup.string().required(),
      designation: yup.string().required(),
      institution: yup.string().required(),
    })
  ),
  images: yup.array().of(yup.string()),
  holders: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      phone: yup.number().required(),
      designation: yup.string().required(),
    })
  ),
});

async function handler(
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

    const file: EventType = {
      ...data,
      createdAt: new Date().getTime(),
      createdBy: req.session.user.key,
    } as unknown as EventType;

    await createEvent(file);

    return res.status(200).json({
      message: "success",
      data,
    });
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
