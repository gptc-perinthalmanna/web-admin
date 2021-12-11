import adminRoute from "helpers/routes/adminRoute";
import * as yup from "yup";
import { OtherType } from "../../../../server/db";
import { validation } from "../../../../helpers/validation";
import { createOther } from "../../../../server/other";

const userValidationSchema: yup.SchemaOf<{}> = yup.object().shape({
  key: yup.string().min(3).required(),
  value: yup.object().required(),
});

export default adminRoute(async (req) => {
  const { isValid, errors, data } = await validation(
    userValidationSchema,
    req.body
  );
  if (!isValid) {
    return { error: errors };
  }

  const other: OtherType = {
    ...data,
  } as unknown as OtherType;

  await createOther(other);

  return {
    message: "success",
    data,
  };
});
