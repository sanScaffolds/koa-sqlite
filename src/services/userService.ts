import User from "../models/User";
import { AppError } from "../utils";
import { ErrorCode } from "../utils/errorCodes";
import { User as UserType } from "../types";

interface UserCreateData {
  name: string;
  email: string;
  password: string;
}

interface UserUpdateData {
  name?: string;
  email?: string;
  password?: string;
}

interface ListOptions {
  page: number;
  pageSize: number;
  keyword: string;
}

interface UserListResponse {
  list: Omit<UserType, "password">[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

class UserService {
  async create(userData: UserCreateData): Promise<Omit<UserType, "password">> {
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

  async list({ page = 1, pageSize = 10, keyword = "" }: ListOptions): Promise<UserListResponse> {
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

    const total = countResult?.total || 0;

    return {
      list,
      pagination: {
        page,
        pageSize,
        total: total as number,
        totalPages: Math.ceil((total as number) / pageSize),
      },
    };
  }

  async getById(id: number): Promise<Omit<UserType, "password">> {
    const user = await User.findById(id);
    if (!user) {
      throw AppError.notFound("用户不存在", ErrorCode.USER_NOT_FOUND);
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async update(id: number, updateData: UserUpdateData): Promise<Omit<UserType, "password">> {
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

  async delete(id: number): Promise<boolean> {
    const user = await User.findById(id);
    if (!user) {
      throw AppError.notFound("用户不存在", ErrorCode.USER_NOT_FOUND);
    }
    await User.delete(id);
    return true;
  }
}

export default new UserService();
