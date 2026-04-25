"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOne = exports.getMany = exports.update = exports.create = void 0;
const joi_1 = __importDefault(require("joi"));
const create = {
    body: joi_1.default.object({
        name: joi_1.default.string().min(2).max(50).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
    }),
};
exports.create = create;
const update = {
    params: joi_1.default.object({
        id: joi_1.default.number().integer().positive().required(),
    }),
    body: joi_1.default.object({
        name: joi_1.default.string().min(2).max(50),
        email: joi_1.default.string().email(),
        password: joi_1.default.string().min(6),
    }).min(1),
};
exports.update = update;
const getMany = {
    query: joi_1.default.object({
        page: joi_1.default.number().integer().min(1).default(1),
        pageSize: joi_1.default.number().integer().min(1).max(100).default(10),
        keyword: joi_1.default.string().allow(""),
    }),
};
exports.getMany = getMany;
const getOne = {
    params: joi_1.default.object({
        id: joi_1.default.number().integer().positive().required(),
    }),
};
exports.getOne = getOne;
