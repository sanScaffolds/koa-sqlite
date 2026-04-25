const { logger } = require("../utils");

async function loggerMiddleware(ctx, next) {
  const start = Date.now();
  const requestId = Math.random().toString(36).substring(2, 10);

  logger.info(`--> ${ctx.method} ${ctx.url}`, {
    requestId,
    ip: ctx.ip,
    userAgent: ctx.get("User-Agent"),
  });

  try {
    await next();
  } finally {
    const ms = Date.now() - start;
    const level = ctx.status >= 400 ? "warn" : "info";

    logger[level](`<-- ${ctx.method} ${ctx.url} ${ctx.status} ${ms}ms`, {
      requestId,
      status: ctx.status,
      duration: ms,
    });
  }
}

module.exports = loggerMiddleware;