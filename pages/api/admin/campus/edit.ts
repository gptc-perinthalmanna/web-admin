import adminRoute from "helpers/routes/adminRoute";
import * as yup from "yup";
import { CampusPageType } from "server/db";
import { createPage } from "server/pages";
import { validation } from "helpers/validation";

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

  const page: CampusPageType = { ...data } as unknown as CampusPageType;
  await createPage(page, "campus");

  return {
    message: "success",
    data,
  };
});
