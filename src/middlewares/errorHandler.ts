import { Context, Next } from "koa";
import { Response, logger, AppError, ErrorCode } from "../utils";

async function errorHandler(ctx: Context, next: Next) {
  try {
    await next();
  } catch (err: any) {
    if (err instanceof AppError) {
      logger.warn(`AppError: ${err.message}`, {
        code: err.code,
        details: err.details,
      });
      Response.error(ctx, err.message, err.code, err.httpStatus);
    } else {
      logger.error(`Unhandled Error: ${err.message}`, {
        stack: err.stack,
      });
      const status = err.status || 500;
      const code = status === 500 ? ErrorCode.UNKNOWN_ERROR : -1;
      Response.error(ctx, err.message || "服务器内部错误", code, status);
    }
  }
}

export default errorHandler;
