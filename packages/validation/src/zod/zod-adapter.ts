import { ZodType } from "zod";
import { Validator } from "@eventix/core";

export const fromZod = <T>(schema: ZodType<T>): Validator<T> => ({
  validate(data) {
    const result = schema.safeParse(data);
    return result.success
      ? { success: true, data: result.data }
      : { success: false, error: result.error };
  },
});
