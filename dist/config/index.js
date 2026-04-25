"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), envFile) });
const config = {
    port: parseInt(process.env.PORT || "3000", 10),
    db: {
        path: process.env.DB_PATH || path_1.default.resolve(process.cwd(), "data/app.db"),
    },
    env: process.env.NODE_ENV || "development",
};
exports.default = Object.freeze(config);
