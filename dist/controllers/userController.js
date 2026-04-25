"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const utils_1 = require("../utils");
class UserController {
    async create(ctx) {
        const user = await services_1.userService.create(ctx.request.body);
        utils_1.Response.success(ctx, user, "创建成功");
    }
    async list(ctx) {
        const { page, pageSize, keyword } = ctx.query;
        const result = await services_1.userService.list({
            page: Number(page),
            pageSize: Number(pageSize),
            keyword: String(keyword)
        });
        utils_1.Response.success(ctx, result);
    }
    async get(ctx) {
        const { id } = ctx.params;
        const user = await services_1.userService.getById(Number(id));
        utils_1.Response.success(ctx, user);
    }
    async update(ctx) {
        const { id } = ctx.params;
        const user = await services_1.userService.update(Number(id), ctx.request.body);
        utils_1.Response.success(ctx, user, "更新成功");
    }
    async delete(ctx) {
        const { id } = ctx.params;
        await services_1.userService.delete(Number(id));
        utils_1.Response.success(ctx, null, "删除成功");
    }
}
exports.default = new UserController();
