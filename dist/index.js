"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./utils/logger"));
logger_1.default.info(`配置加载成功 - 端口: ${config_1.default.port}, 环境: ${config_1.default.env}, 数据库: ${config_1.default.db.path}`);
const app_1 = __importDefault(require("./app"));
const server = app_1.default.listen(config_1.default.port, () => {
    logger_1.default.info(`🚀 服务器已启动: http://localhost:${config_1.default.port}`);
});
exports.default = server;
