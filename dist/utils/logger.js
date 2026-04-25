"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const config_1 = __importDefault(require("../config"));
const { combine, timestamp, printf, colorize, errors } = winston_1.default.format;
const logFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
    let log = `${timestamp} [${level}]: ${message}`;
    if (stack)
        log += `\n${stack}`;
    if (Object.keys(meta).length)
        log += ` ${JSON.stringify(meta)}`;
    return log;
});
const logger = winston_1.default.createLogger({
    level: config_1.default.env === "development" ? "debug" : "info",
    format: combine(errors({ stack: true }), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
    transports: [
        new winston_1.default.transports.Console({
            format: combine(colorize(), errors({ stack: true }), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
        }),
    ],
});
exports.default = logger;
