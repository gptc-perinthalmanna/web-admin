import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";

import adminRoute from "helpers/routes/adminRoute";
import { FileType } from "server/db";
import { createFile } from "server/files";
import { validation } from "helpers/validation";

const userValidationSchema: yup.SchemaOf<{}> = yup.object().shape({
  key: yup.string().default(function () {
    return uuidv4();
  }),
  title: yup.string().min(3).required(),
  description: yup.string().min(10).required(),
  tags: yup.array().of(yup.string()).min(1).required(),
  url: yup.string().url().required(),
});

export default adminRoute(async (req) => {
  const { isValid, errors, data } = await validation(
    userValidationSchema,
    req.body
  );
  if (!isValid) {
    return { error: errors };
  }

  const file: FileType = {
    ...data,
  } as unknown as FileType;

  await createFile(file);

  return {
    message: "success",
    data,
  };
});
