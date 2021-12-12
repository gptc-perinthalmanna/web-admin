import adminRoute from "helpers/routes/adminRoute";
import * as yup from "yup";

import { NotificationType } from "server/db";
import { createNotificiations, deleteNotification } from "server/notifications";
import { validation } from "helpers/validation";

const userValidationSchema: yup.SchemaOf<{}> = yup.object().shape({
  key: yup.string().required(),
});

export default adminRoute(async (req) => {
  const { isValid, errors, data } = await validation(
    userValidationSchema,
    req.body
  );
  if (!isValid) {
    return { error: errors };
  }
  const { key } = data;
  await deleteNotification(key);

  return {
    message: "success",
    data,
  };
});
