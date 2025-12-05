import type { Resolver, FieldError } from "react-hook-form";
import { z } from "zod";

export function zodResolver<T extends z.ZodType<any, any>>(
  schema: T,
): Resolver<z.infer<T>> {
  return async (values) => {
    try {
      const result = await schema.parseAsync(values);
      return {
        values: result,
        errors: {},
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, FieldError> = {};

        for (const issue of error.issues) {
          const path = issue.path.join(".");
          if (!errors[path]) {
            errors[path] = {
              type: issue.code,
              message: issue.message,
            };
          }
        }

        return {
          values: {},
          errors: errors as any,
        };
      }

      // Re-throw unexpected errors
      throw error;
    }
  };
}
