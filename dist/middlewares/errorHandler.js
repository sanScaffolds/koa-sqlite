"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
async function errorHandler(ctx, next) {
    try {
        await next();
    }
    catch (err) {
        if (err instanceof utils_1.AppError) {
            utils_1.logger.warn(`AppError: ${err.message}`, {
                code: err.code,
                details: err.details,
            });
            utils_1.Response.error(ctx, err.message, err.code, err.httpStatus);
        }
        else {
            utils_1.logger.error(`Unhandled Error: ${err.message}`, {
                stack: err.stack,
            });
            const status = err.status || 500;
            const code = status === 500 ? utils_1.ErrorCode.UNKNOWN_ERROR : -1;
            utils_1.Response.error(ctx, err.message || "服务器内部错误", code, status);
        }
    }
}
exports.default = errorHandler;
