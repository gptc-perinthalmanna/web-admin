import adminRoute from "helpers/routes/adminRoute";
import * as yup from "yup";
import { NewsMediaType } from "../../../../server/db";
import { createNews } from "../../../../server/newsAndMedia";
import { validation } from "../../../../helpers/validation";

const userValidationSchema: yup.SchemaOf<{}> = yup.object().shape({
  key: yup.string().default(function () {
    return new Date().getTime().toString();
  }),
  title: yup.string().min(3).required(),
  author: yup.string().min(3).required(),
  description: yup.string().min(40).required(),
  date: yup.string().min(3).required(),
  url: yup.string().url(),
});


export default adminRoute(async (req) => {
  const { isValid, errors, data } = await validation(
    userValidationSchema,
    req.body
  );
  if (!isValid) {
    return { error: errors };
  }

  const news: NewsMediaType = {
    ...data,
  } as unknown as NewsMediaType;

  await createNews(news);

  return {
    message: "success",
    data,
  };
});
