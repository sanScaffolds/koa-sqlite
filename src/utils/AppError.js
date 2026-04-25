const { ErrorCode } = require("./errorCodes");

class AppError extends Error {
  constructor({
    code = ErrorCode.UNKNOWN_ERROR,
    message,
    httpStatus = 500,
    details = null,
  }) {
    super(message);
    this.code = code;
    this.httpStatus = httpStatus;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static validation(message = "参数校验失败", details = null) {
    return new AppError({
      code: ErrorCode.VALIDATION_ERROR,
      message,
      httpStatus: 400,
      details,
    });
  }

  static notFound(message = "资源不存在", code = ErrorCode.NOT_FOUND) {
    return new AppError({
      code,
      message,
      httpStatus: 404,
    });
  }

  static unauthorized(message = "未授权") {
    return new AppError({
      code: ErrorCode.UNAUTHORIZED,
      message,
      httpStatus: 401,
    });
  }

  static forbidden(message = "禁止访问") {
    return new AppError({
      code: ErrorCode.FORBIDDEN,
      message,
      httpStatus: 403,
    });
  }
}

module.exports = AppError;