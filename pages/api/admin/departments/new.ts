import * as yup from "yup";
import { DepartmentsType } from "../../../../server/db";
import { createDepartmentPage } from "../../../../server/departments";
import { validation } from "../../../../helpers/validation";
import adminRoute from "helpers/routes/adminRoute";


const userValidationSchema: yup.SchemaOf<{}> = yup.object().shape({
  key: yup.string().required(),
  title: yup.string().min(3).required(),
  about: yup.string().min(40).required(),
  cover: yup.string().url().required(),
  staffs_ids: yup.array().of(yup.string().required()).required(),
});


export default adminRoute(async (req) => {
  const { isValid, errors, data } = await validation(
    userValidationSchema,
    req.body
  );
  if (!isValid) {
    return { error: errors };
  }
  const page: DepartmentsType = { ...data } as unknown as DepartmentsType;
  await createDepartmentPage(page);
  return {
    message: "success",
    data,
  };
});
