const path = require("path");
const config = require("./src/config");

module.exports = {
  development: {
    client: "better-sqlite3",
    connection: {
      filename: config.db.path,
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, "src/db/migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "src/db/seeds"),
    },
  },
  test: {
    client: "better-sqlite3",
    connection: {
      filename: ":memory:",
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, "src/db/migrations"),
    },
  },
  production: {
    client: "better-sqlite3",
    connection: {
      filename: config.db.path,
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, "src/db/migrations"),
    },
  },
};