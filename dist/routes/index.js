"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const utils_1 = require("../utils");
const router = new koa_router_1.default({ prefix: "/api" });
router.get("/health", (ctx) => {
    utils_1.Response.success(ctx, { status: "ok" });
});
router.use(userRoutes_1.default.routes());
exports.default = router;
