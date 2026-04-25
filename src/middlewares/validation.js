const { Response } = require("../utils");
const { logger } = require("../utils");

function validate(schema, options = {}) {
  const defaultOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const validationOptions = { ...defaultOptions, ...options };

  return async (ctx, next) => {
    const errors = [];

    if (schema.body) {
      const { error, value } = schema.body.validate(
        ctx.request.body,
        validationOptions,
      );
      if (error) {
        errors.push(
          ...error.details.map((detail) => ({
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
          ...error.details.map((detail) => ({
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
          ...error.details.map((detail) => ({
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

module.exports = validate;