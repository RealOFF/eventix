export type Validator<T> = {
  validate(
    data: unknown,
  ): { success: true; data: T } | { success: false; error: any };
};
