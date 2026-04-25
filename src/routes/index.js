const Router = require("koa-router");
const userRoutes = require("./userRoutes");

const router = new Router();

router.get("/health", (ctx) => {
  const Response = require("../utils/response");
  Response.success(ctx, { status: "ok" });
});

router.use(userRoutes.routes());

module.exports = router;