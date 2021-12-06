import * as yup from "yup";

export async function validation<T = Record<string, any>>(
    scheme: yup.SchemaOf<T>,
    data: Record<string, any> | null
  ) {
    try {
      const validatedData = await scheme.validate(data, { abortEarly: false });
      return { isValid: true, errors: null, data: validatedData };
    } catch (error: any) {
      const { errors } = error;
      return { isValid: false, errors, data: null };
    }
  }