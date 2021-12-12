import * as yup from "yup";

import adminRoute from "helpers/routes/adminRoute";
import { validation } from "helpers/validation";
import { deleteFile } from "server/files";

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
  await deleteFile(key);

  return {
    message: "success",
    data,
  };
});
