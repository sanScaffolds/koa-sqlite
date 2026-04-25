const BaseModel = require("./BaseModel");

class User extends BaseModel {
  constructor() {
    super("users");
  }

  async findByEmail(email) {
    return this.findOne({ email });
  }
}

module.exports = new User();