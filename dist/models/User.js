"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class User extends BaseModel_1.default {
    constructor() {
        super("users");
    }
    async findByEmail(email) {
        return this.findOne({ email });
    }
}
exports.default = new User();
