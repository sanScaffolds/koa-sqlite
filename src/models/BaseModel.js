const db = require("../db/connection");

class BaseModel {
  constructor(tableName) {
    this.tableName = tableName;
    this.db = db;
  }

  query() {
    return this.db(this.tableName);
  }

  async findById(id) {
    return this.query().where({ id }).first();
  }

  async findOne(where) {
    return this.query().where(where).first();
  }

  async findAll(where = {}) {
    return this.query().where(where);
  }

  async create(data) {
    const [id] = await this.query().insert(data);
    return this.findById(id);
  }

  async update(id, data) {
    await this.query().where({ id }).update(data);
    return this.findById(id);
  }

  async delete(id) {
    return this.query().where({ id }).del();
  }

  async transaction(callback) {
    return this.db.transaction(callback);
  }
}

module.exports = BaseModel;