import type { Resolver, FieldError, FieldValues } from "react-hook-form";
import { z } from "zod";

export function zodResolver<T extends z.ZodType<any, any, any>>(
	schema: T,
): Resolver<z.infer<T> extends FieldValues ? z.infer<T> : never> {
	return async (values) => {
		try {
			const result = await schema.parseAsync(values);
			return {
				values: result as z.infer<T>,
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
					values: {} as z.infer<T>,
					errors: errors as any,
				};
			}

			// Re-throw unexpected errors
			throw error;
		}
	};
}
