import { Validator } from "@eventix/core";
import { Static, TSchema } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

export const fromTypebox = <T extends TSchema>(
  schema: T,
): Validator<Static<T>> => ({
  validate(data) {
    return Value.Check(schema, data)
      ? { success: true, data: data as Static<T> }
      : { success: false, error: new Error("Validation failed") };
  },
});
