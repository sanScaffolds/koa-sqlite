"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const middlewares_1 = require("./middlewares");
const routes_1 = __importDefault(require("./routes"));
const app = new koa_1.default();
app.use(middlewares_1.errorHandler);
app.use(middlewares_1.loggerMiddleware);
app.use((0, koa_bodyparser_1.default)());
app.use(routes_1.default.routes()).use(routes_1.default.allowedMethods());
exports.default = app;
