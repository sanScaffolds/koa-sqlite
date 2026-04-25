import { Context } from "koa";
import { userService } from "../services";
import { Response } from "../utils";

class UserController {
  async create(ctx: Context) {
    const user = await userService.create(ctx.request.body as any);
    Response.success(ctx, user, "创建成功");
  }

  async list(ctx: Context) {
    const { page, pageSize, keyword } = ctx.query;
    const result = await userService.list({ 
      page: Number(page), 
      pageSize: Number(pageSize), 
      keyword: String(keyword) 
    });
    Response.success(ctx, result);
  }

  async get(ctx: Context) {
    const { id } = ctx.params;
    const user = await userService.getById(Number(id));
    Response.success(ctx, user);
  }

  async update(ctx: Context) {
    const { id } = ctx.params;
    const user = await userService.update(Number(id), ctx.request.body as any);
    Response.success(ctx, user, "更新成功");
  }

  async delete(ctx: Context) {
    const { id } = ctx.params;
    await userService.delete(Number(id));
    Response.success(ctx, null, "删除成功");
  }
}

export default new UserController();
