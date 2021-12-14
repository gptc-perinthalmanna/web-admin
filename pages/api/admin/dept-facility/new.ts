import * as yup from "yup";
import { validation } from "helpers/validation";
import adminRoute from "helpers/routes/adminRoute";
import { createDeptFacility } from "server/facilities";
import { v4 as uuidv4 } from "uuid";

const userValidationSchema: yup.SchemaOf<{}> = yup.object().shape({
  key: yup.string().default(function () {
    return uuidv4();
  }).notRequired(),
  title: yup.string().min(3).required(),
  description: yup.string().min(40).required(),
  image: yup.string().url().required(),
  tags: yup.array().of(yup.string().required()).required(),
  color: yup.string().min(3).required(),
}).noUnknown();

export default adminRoute(async (req) => {
  const { isValid, errors, data } = await validation(
    userValidationSchema,
    req.body
  );
  if (!isValid) {
    return { error: errors };
  }
  await createDeptFacility(data);
  return {
    message: "success",
    data,
  };
});
