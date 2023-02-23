import "reflect-metadata";
import { DataSource } from "typeorm";

import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  extra: {
    decimalNumbers: true,
  },
  host: process.env.DATABASE_HOST.toString(),
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER.toString(),
  password: process.env.DATABASE_PASS.toString(),
  database: process.env.DATABASE_NAME.toString(),

  synchronize: true,
  logging: false,
  entities: ["src/entities/**/*.ts"],
  migrations: [],
  subscribers: [],
});
