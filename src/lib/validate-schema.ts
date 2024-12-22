import { z } from "zod";

export function validateSchema(
  schema: z.ZodSchema,
  data: Record<string, unknown>,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
) {
  try {
    schema.parse(data);
    setErrors({});
    return true;
  } catch (e) {
    if (e instanceof z.ZodError) {
      const fieldErrors = e.errors.reduce((acc, error) => {
        const fieldName = error.path[0] as string;
        acc[fieldName] = error.message;
        return acc;
      }, {} as Record<string, string>);
      setErrors(fieldErrors);
    }
    return false;
  }
}
