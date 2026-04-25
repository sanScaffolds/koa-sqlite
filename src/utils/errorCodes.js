const ErrorCode = {
  SUCCESS: 0,
  UNKNOWN_ERROR: 1000,
  VALIDATION_ERROR: 1001,
  NOT_FOUND: 1002,
  UNAUTHORIZED: 1003,
  FORBIDDEN: 1004,
  CONFLICT: 1005,
  USER_NOT_FOUND: 2001,
  USER_EMAIL_EXISTS: 2002,
  INVALID_CREDENTIALS: 2003,
};

const ErrorMessage = {
  [ErrorCode.SUCCESS]: "成功",
  [ErrorCode.UNKNOWN_ERROR]: "服务器内部错误",
  [ErrorCode.VALIDATION_ERROR]: "参数校验失败",
  [ErrorCode.NOT_FOUND]: "资源不存在",
  [ErrorCode.UNAUTHORIZED]: "未授权",
  [ErrorCode.FORBIDDEN]: "禁止访问",
  [ErrorCode.CONFLICT]: "资源冲突",
  [ErrorCode.USER_NOT_FOUND]: "用户不存在",
  [ErrorCode.USER_EMAIL_EXISTS]: "邮箱已被注册",
  [ErrorCode.INVALID_CREDENTIALS]: "用户名或密码错误",
};

module.exports = {
  ErrorCode,
  ErrorMessage,
};