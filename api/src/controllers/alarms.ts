import express from "express";
import { Alarm } from "shared/alarm";

const alarms: Alarm[] = [
  {
    id: 1,
    name: "Réveil",
    time: "08:00",
    active: true,
  },
  {
    id: 2,
    time: "13:00",
    active: false,
  },
  {
    id: 3,
    time: "14:00",
    active: true,
  },
];

const router = express.Router();

router.get("/", function (req, res) {
  res.status(200).json(alarms);
});

router.delete("/:id", function (req, res) {
  const { id } = req.params;
  const alarmIndex = alarms.findIndex((alarm) => alarm.id === Number(id));
  if (alarmIndex === -1) {
    res.status(404).send("Alarm not found");
    return;
  }

  alarms.splice(alarmIndex, 1);
  res.status(204).send(alarms[alarmIndex]);
});

router.post("/", function (req, res) {
  const alarm = req.body as Alarm;
  if (!alarm.time) {
    res.status(400).send("time property is required");
    return;
  }
});

router.patch("/:id", function (req, res) {
  const { id } = req.params;
  const alarm = req.body as Alarm;
  const alarmIndex = alarms.findIndex((alarm) => alarm.id === Number(id));
  if (alarmIndex === -1) {
    res.status(404).send("Alarm not found");
    return;
  }

  alarms[alarmIndex] = { ...alarms[alarmIndex], ...alarm };
  res.status(200).json(alarms[alarmIndex]);
});

export default router;
