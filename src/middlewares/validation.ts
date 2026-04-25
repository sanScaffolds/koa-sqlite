import { Context, Next } from "koa";
import { Response, logger } from "../utils";

interface ValidationSchema {
  body?: any;
  query?: any;
  params?: any;
}

interface ValidationOptions {
  abortEarly?: boolean;
  allowUnknown?: boolean;
  stripUnknown?: boolean;
}

function validate(schema: ValidationSchema, options: ValidationOptions = {}) {
  const defaultOptions: ValidationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const validationOptions = { ...defaultOptions, ...options };

  return async (ctx: Context, next: Next) => {
    const errors: Array<{ field: string; message: string }> = [];

    if (schema.body) {
      const { error, value } = schema.body.validate(
        ctx.request.body,
        validationOptions,
      );
      if (error) {
        errors.push(
          ...error.details.map((detail: any) => ({
            field: `body.${detail.path.join(".")}`,
            message: detail.message,
          })),
        );
      } else {
        ctx.request.body = value;
      }
    }

    if (schema.query) {
      const { error, value } = schema.query.validate(
        ctx.query,
        validationOptions,
      );
      if (error) {
        errors.push(
          ...error.details.map((detail: any) => ({
            field: `query.${detail.path.join(".")}`,
            message: detail.message,
          })),
        );
      } else {
        ctx.query = value;
      }
    }

    if (schema.params) {
      const { error, value } = schema.params.validate(
        ctx.params,
        validationOptions,
      );
      if (error) {
        errors.push(
          ...error.details.map((detail: any) => ({
            field: `params.${detail.path.join(".")}`,
            message: detail.message,
          })),
        );
      } else {
        ctx.params = value;
      }
    }

    if (errors.length > 0) {
      logger.warn("参数校验失败", { errors });
      return Response.error(ctx, "参数校验失败", 400, 400);
    }

    await next();
  };
}

export default validate;
