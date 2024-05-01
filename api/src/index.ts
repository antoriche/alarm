import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import alarms from "./controllers/alarms";
import { sequelize } from "./sequelize";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/alarms", alarms);

sequelize.sync().then(() => {
  app.listen(Number(process.env.PORT || 3001));
});
