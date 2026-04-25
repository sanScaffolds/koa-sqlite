import path from "path";
import dotenv from "dotenv";

const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const config = {
  port: parseInt(process.env.PORT || "3000", 10),
  db: {
    path: process.env.DB_PATH || path.resolve(process.cwd(), "data/app.db"),
  },
  env: process.env.NODE_ENV || "development",
};

export default Object.freeze(config);
