const { userService } = require("../services");
const { Response } = require("../utils");

class UserController {
  async create(ctx) {
    const user = await userService.create(ctx.request.body);
    Response.success(ctx, user, "创建成功");
  }

  async list(ctx) {
    const { page, pageSize, keyword } = ctx.query;
    const result = await userService.list({ page, pageSize, keyword });
    Response.success(ctx, result);
  }

  async get(ctx) {
    const { id } = ctx.params;
    const user = await userService.getById(id);
    Response.success(ctx, user);
  }

  async update(ctx) {
    const { id } = ctx.params;
    const user = await userService.update(id, ctx.request.body);
    Response.success(ctx, user, "更新成功");
  }

  async delete(ctx) {
    const { id } = ctx.params;
    await userService.delete(id);
    Response.success(ctx, null, "删除成功");
  }
}

module.exports = new UserController();