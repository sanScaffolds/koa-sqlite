"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const userController_1 = __importDefault(require("../controllers/userController"));
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
const router = new koa_router_1.default({ prefix: "/users" });
router.post("/", (0, middlewares_1.validate)(schemas_1.userSchema.create), userController_1.default.create);
router.get("/", (0, middlewares_1.validate)(schemas_1.userSchema.getMany), userController_1.default.list);
router.get("/:id", (0, middlewares_1.validate)(schemas_1.userSchema.getOne), userController_1.default.get);
router.put("/:id", (0, middlewares_1.validate)(schemas_1.userSchema.update), userController_1.default.update);
router.delete("/:id", (0, middlewares_1.validate)(schemas_1.userSchema.getOne), userController_1.default.delete);
exports.default = router;
