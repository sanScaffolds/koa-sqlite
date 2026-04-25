import knex from "knex";
import config from "../config";
import path from "path";

const db = knex({
  client: "better-sqlite3",
  connection: {
    filename: config.db.path,
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.resolve(__dirname, "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "seeds"),
  },
});

export default db;
