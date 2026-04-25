const User = require("../models/User");
const { AppError } = require("../utils");
const { ErrorCode } = require("../utils/errorCodes");

class UserService {
  async create(userData) {
    const { email, name, password } = userData;

    const existing = await User.findByEmail(email);
    if (existing) {
      throw AppError.conflict("邮箱已被注册", ErrorCode.USER_EMAIL_EXISTS);
    }

    const hashedPassword = password;

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async list({ page = 1, pageSize = 10, keyword = "" }) {
    const offset = (page - 1) * pageSize;
    let query = User.query();

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

    return {
      list,
      pagination: {
        page,
        pageSize,
        total: countResult.total,
        totalPages: Math.ceil(countResult.total / pageSize),
      },
    };
  }

  async getById(id) {
    const user = await User.findById(id);
    if (!user) {
      throw AppError.notFound("用户不存在", ErrorCode.USER_NOT_FOUND);
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async update(id, updateData) {
    const user = await User.findById(id);
    if (!user) {
      throw AppError.notFound("用户不存在", ErrorCode.USER_NOT_FOUND);
    }

    if (updateData.email && updateData.email !== user.email) {
      const existing = await User.findByEmail(updateData.email);
      if (existing) {
        throw AppError.conflict("邮箱已被注册", ErrorCode.USER_EMAIL_EXISTS);
      }
    }

    const updated = await User.update(id, updateData);
    const { password, ...userWithoutPassword } = updated;
    return userWithoutPassword;
  }

  async delete(id) {
    const user = await User.findById(id);
    if (!user) {
      throw AppError.notFound("用户不存在", ErrorCode.USER_NOT_FOUND);
    }
    await User.delete(id);
    return true;
  }
}

module.exports = new UserService();