import Koa from "koa";
import bodyParser from "koa-bodyparser";

import { errorHandler, loggerMiddleware } from "./middlewares";
import router from "./routes";

const app = new Koa();

app.use(errorHandler);
app.use(loggerMiddleware);
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

export default app;
