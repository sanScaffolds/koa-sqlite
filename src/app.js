const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const { errorHandler, loggerMiddleware } = require("./middlewares");
const router = require("./routes");

const app = new Koa();

app.use(errorHandler);
app.use(loggerMiddleware);
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

module.exports = app;