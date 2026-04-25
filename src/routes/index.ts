import Router from "koa-router";
import userRoutes from "./userRoutes";
import { Response } from "../utils";
import { Context } from "koa";

const router = new Router({ prefix: "/api" });

router.get("/health", (ctx: Context) => {
  Response.success(ctx, { status: "ok" });
});

router.use(userRoutes.routes());

export default router;
