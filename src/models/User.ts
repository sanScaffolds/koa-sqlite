import BaseModel from "./BaseModel";
import { User as UserType } from "../types";

class User extends BaseModel {
  constructor() {
    super("users");
  }

  async findByEmail(email: string): Promise<UserType | null> {
    return this.findOne({ email });
  }
}

export default new User();
