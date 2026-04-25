"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const utils_1 = require("../utils");
const errorCodes_1 = require("../utils/errorCodes");
class UserService {
    async create(userData) {
        const { email, name, password } = userData;
        const existing = await User_1.default.findByEmail(email);
        if (existing) {
            throw utils_1.AppError.conflict("邮箱已被注册", errorCodes_1.ErrorCode.USER_EMAIL_EXISTS);
        }
        const hashedPassword = password;
        const newUser = await User_1.default.create({
            name,
            email,
            password: hashedPassword,
        });
        const { password: _, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }
    async list({ page = 1, pageSize = 10, keyword = "" }) {
        const offset = (page - 1) * pageSize;
        let query = User_1.default.query();
        if (keyword) {
            query = query
                .where("name", "like", `%${keyword}%`)
                .orWhere("email", "like", `%${keyword}%`);
        }
        const [list, countResult] = await Promise.all([
            query
                .limit(pageSize)
                .offset(offset)
                .select("id", "name", "email", "created_at", "updated_at"),
            query.clone().count("* as total").first(),
        ]);
        const total = countResult?.total || 0;
        return {
            list,
            pagination: {
                page,
                pageSize,
                total: total,
                totalPages: Math.ceil(total / pageSize),
            },
        };
    }
    async getById(id) {
        const user = await User_1.default.findById(id);
        if (!user) {
            throw utils_1.AppError.notFound("用户不存在", errorCodes_1.ErrorCode.USER_NOT_FOUND);
        }
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async update(id, updateData) {
        const user = await User_1.default.findById(id);
        if (!user) {
            throw utils_1.AppError.notFound("用户不存在", errorCodes_1.ErrorCode.USER_NOT_FOUND);
        }
        if (updateData.email && updateData.email !== user.email) {
            const existing = await User_1.default.findByEmail(updateData.email);
            if (existing) {
                throw utils_1.AppError.conflict("邮箱已被注册", errorCodes_1.ErrorCode.USER_EMAIL_EXISTS);
            }
        }
        const updated = await User_1.default.update(id, updateData);
        const { password, ...userWithoutPassword } = updated;
        return userWithoutPassword;
    }
    async delete(id) {
        const user = await User_1.default.findById(id);
        if (!user) {
            throw utils_1.AppError.notFound("用户不存在", errorCodes_1.ErrorCode.USER_NOT_FOUND);
        }
        await User_1.default.delete(id);
        return true;
    }
}
exports.default = new UserService();
