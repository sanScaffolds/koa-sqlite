class Response {
  static success(ctx, data = null, message = "success") {
    ctx.status = 200;
    ctx.body = {
      code: 0,
      message,
      data,
    };
  }

  static error(ctx, message = "error", code = -1, status = 200) {
    ctx.status = status;
    ctx.body = {
      code,
      message,
    };
  }
}

module.exports = Response;