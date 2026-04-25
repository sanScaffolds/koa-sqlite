const path = require("path");

const config = {
  port: parseInt(process.env.PORT || "3000", 10),
  db: {
    path: process.env.DB_PATH || path.resolve(process.cwd(), "data/app.db"),
  },
  env: process.env.NODE_ENV || "development",
};

module.exports = config;
