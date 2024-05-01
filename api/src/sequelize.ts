import { Sequelize } from "sequelize-typescript";
import { Alarm } from "./models/Alarm";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
  models: [Alarm],
});
