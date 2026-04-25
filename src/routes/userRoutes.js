const Router = require("koa-router");
const userController = require("../controllers/userController");
const { validate } = require("../middlewares");
const { userSchema } = require("../schemas");

const router = new Router({ prefix: "/users" });

router.post("/", validate(userSchema.create), userController.create);
router.get("/", validate(userSchema.getMany), userController.list);
router.get("/:id", validate(userSchema.getOne), userController.get);
router.put("/:id", validate(userSchema.update), userController.update);
router.delete("/:id", validate(userSchema.getOne), userController.delete);

module.exports = router;