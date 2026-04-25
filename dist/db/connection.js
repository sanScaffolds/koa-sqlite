"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const config_1 = __importDefault(require("../config"));
const path_1 = __importDefault(require("path"));
const db = (0, knex_1.default)({
    client: "better-sqlite3",
    connection: {
        filename: config_1.default.db.path,
    },
    useNullAsDefault: true,
    migrations: {
        directory: path_1.default.resolve(__dirname, "migrations"),
    },
    seeds: {
        directory: path_1.default.resolve(__dirname, "seeds"),
    },
});
exports.default = db;
