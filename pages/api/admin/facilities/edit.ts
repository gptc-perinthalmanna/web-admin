import adminRoute from "helpers/routes/adminRoute";
import * as yup from "yup";
import { FacilityPageType } from "server/db";
import { validation } from "helpers/validation";
import { createPage } from "server/pages";

const userValidationSchema: yup.SchemaOf<{}> = yup.object().shape({
  key: yup.string().required(),
  title: yup.string().min(3).required(),
  about: yup.string().min(40).required(),
  cover: yup.string().url().required(),
  staffs_ids: yup.array().of(yup.string().required()),
  photos_ids: yup.array().of(yup.string().required()).nullable(),
});

export default adminRoute(async (req) => {
  const { isValid, errors, data } = await validation(
    userValidationSchema,
    req.body
  );
  if (!isValid) {
    return { error: errors };
  }
  const page: FacilityPageType = { ...data } as unknown as FacilityPageType;
  await createPage(page, "facility");
  return {
    message: "success",
    data,
  };
});
