import adminRoute from "helpers/routes/adminRoute";
import * as yup from "yup";

import { NotificationType } from "server/db";
import { createNotificiations } from "server/notifications";
import { validation } from "helpers/validation";

const userValidationSchema: yup.SchemaOf<{}> = yup.object().shape({
  key: yup.string().required(),
  title: yup.string().min(3).required(),
  link: yup.string().url(),
  createdAt: yup.number().required(),
  tags: yup.array(yup.string().required()).required(),
  expired: yup.boolean().required(),
  expiryDate: yup.number().min(33),
  category: yup.string().min(3),
  author: yup.string().min(3).required(),
});

export default adminRoute(async (req) => {
  const { isValid, errors, data } = await validation(
    userValidationSchema,
    req.body
  );
  if (!isValid) {
    return { error: errors };
  }

  const notifications: NotificationType = {
    ...data,
  } as unknown as NotificationType;

  await createNotificiations({...notifications});

  return {
    message: "success",
    data,
  };
});
