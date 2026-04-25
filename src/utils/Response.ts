import { Context } from "koa";

export class Response {
  static success(ctx: Context, data: any = null, message: string = "success") {
    ctx.status = 200;
    ctx.body = {
      code: 0,
      message,
      data,
    };
  }

  static error(ctx: Context, message: string = "error", code: number = -1, status: number = 200) {
    ctx.status = status;
    ctx.body = {
      code,
      message,
    };
  }
}

export default Response;
