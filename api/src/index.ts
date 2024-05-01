import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import alarms from "./controllers/alarms";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/alarms", alarms);

app.listen(Number(process.env.PORT || 3001));
