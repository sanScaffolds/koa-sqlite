import Router from "koa-router";
import userController from "../controllers/userController";
import { validate } from "../middlewares";
import { userSchema } from "../schemas";

const router = new Router({ prefix: "/users" });

router.post("/", validate(userSchema.create), userController.create);
router.get("/", validate(userSchema.getMany), userController.list);
router.get("/:id", validate(userSchema.getOne), userController.get);
router.put("/:id", validate(userSchema.update), userController.update);
router.delete("/:id", validate(userSchema.getOne), userController.delete);

export default router;
