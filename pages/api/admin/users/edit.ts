import * as yup from "yup";

import adminRoute from "helpers/routes/adminRoute";
import { validation } from "helpers/validation";
import { createUser, getUser } from "server/users";

const userValidationSchema: yup.SchemaOf<{}> = yup
  .object()
  .shape({
    key: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    designation: yup.string().required(),
    department: yup.string().required(),
    updatedAt: yup.number().default(function () {
      return Date.now();
    }),
    role: yup.array().of(yup.string()),
    phone: yup.string().required(),
    address: yup.string().required(),
    socialLinks: yup.object().shape({
      facebook: yup.string().url(),
      linkedin: yup.string().url(),
      instagram: yup.string().url(),
      whatsapp: yup.string(),
    }),
  })
  .noUnknown();

export default adminRoute(async (req) => {
  const { isValid, errors, data } = await validation(
    userValidationSchema,
    req.body
  );
  if (!isValid) {
    return { error: errors };
  }
  const user = await getUser(data.key);
  let role = user.role;
  let phone = user.phone;
  if (req.session.user.role.includes("admin")) {
    role = data.role;
    phone = data.phone;
  }
  await createUser({ ...user, ...data, role, phone });
  return {
    message: "success",
    data,
  };
});
