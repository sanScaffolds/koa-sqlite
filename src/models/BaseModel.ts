import db from "../db/connection";

export class BaseModel {
  protected tableName: string;
  protected db = db;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  query() {
    return this.db(this.tableName);
  }

  async findById(id: number) {
    return this.query().where({ id }).first();
  }

  async findOne(where: Record<string, any>) {
    return this.query().where(where).first();
  }

  async findAll(where: Record<string, any> = {}) {
    return this.query().where(where);
  }

  async create(data: Record<string, any>) {
    const [id] = await this.query().insert(data);
    return this.findById(id);
  }

  async update(id: number, data: Record<string, any>) {
    await this.query().where({ id }).update(data);
    return this.findById(id);
  }

  async delete(id: number) {
    return this.query().where({ id }).del();
  }

  async transaction(callback: (trx: any) => Promise<any>) {
    return this.db.transaction(callback);
  }
}

export default BaseModel;
