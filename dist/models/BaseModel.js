"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
const connection_1 = __importDefault(require("../db/connection"));
class BaseModel {
    constructor(tableName) {
        this.db = connection_1.default;
        this.tableName = tableName;
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
exports.BaseModel = BaseModel;
exports.default = BaseModel;
