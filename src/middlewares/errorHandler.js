const { Response } = require("../utils");
const { logger } = require("../utils");
const { AppError } = require("../utils");
const { ErrorCode } = require("../utils/errorCodes");

async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (err instanceof AppError) {
      logger.warn(`AppError: ${err.message}`, {
        code: err.code,
        details: err.details,
      });
      Response.error(ctx, err.message, err.code, err.httpStatus);
    } else {
      logger.error(`Unhandled Error: ${err.message}`, { stack: err.stack });
      const status = err.status || 500;
      const code = status === 500 ? ErrorCode.UNKNOWN_ERROR : -1;
      Response.error(ctx, err.message || "服务器内部错误", code, status);
    }
  }
}

module.exports = errorHandler;