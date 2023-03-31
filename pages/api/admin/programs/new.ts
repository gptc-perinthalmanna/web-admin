// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import {
  certificatesDB,
  CertificatesType,
  programsDB,
  ProgramType,
} from "server/db";
import { validation } from "helpers/validation";
import { createEvent } from "server/pages";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { ProgramApiIn } from "lib/types";
import { v4 as uuidv4 } from "uuid";
import { getUserByPhone } from "server/users";

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

    const program: ProgramType = {
      ...(data as ProgramApiIn),
      key: uuidv4(),
      createdAt: new Date().getTime(),
      createdBy: req.session.user.key,
    };

    await programsDB.put(program as {});

    const certificates: CertificatesType[] = await Promise.all(
      program.holders.map(async (e, i) => {
        const user = e.phone ? await getUserByPhone(e.phone.toString()) : null;
        return {
          key: uuidv4(),
          createdAt: new Date().getTime(),
          createdBy: req.session.user.key,
          date: program.date,
          holder: {
            id: user.key || "custom",
            avatar: user.avatar || "https://i.ibb.co/2W3sP5f/bd3a2bfe46b8.png",
            designation: user
              ? `${user.department}, GPC Perinthalmanna`
              : e.designation,
            name: user.name || e.name,
          },
          logos: program.logos,
          duration: program.duration,
          title: program.title,
          referance: `00${i + 1}`,
          instructors: program.staffs,
        };
      })
    );
    await certificatesDB.putMany(certificates as {}[]);

    return res.status(200).json({
      message: "success",
      program,
      certificates,
    });
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
