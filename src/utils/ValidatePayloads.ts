import { ZodError, ZodSchema } from "zod";

const validatePayload = (schema: ZodSchema, data: any) => {
  try {
    return {
      success: true,
      data: schema.parse(data),
    };
  } catch (error) {
    // type of this error is ZodError
    if (error instanceof ZodError) {
      return {
        success: false,
        error: error.errors,
      };
    }
    throw error;
  }
};

export { validatePayload };
