import express from "express";
import { Alarm as AlarmType } from "shared/alarm";
import { Alarm } from "../models/Alarm";

const router = express.Router();

router.get("/", async (req, res) => {
  const alarms = await Alarm.findAll();

  res.status(200).json(alarms);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const existing = await Alarm.findByPk(Number(id));
  if (!existing) {
    res.status(404).json({
      error: "Alarm not found",
    });
    return;
  }
  await Alarm.destroy({ where: { id: Number(id) } });
  res.status(204).json(existing);
});

router.post("/", async (req, res) => {
  const alarm = req.body as AlarmType;
  if (!alarm.time) {
    res.status(400).json({
      error: "time property is required",
    });
    return;
  }

  const newAlarm = await Alarm.create(alarm);

  res.status(201).json(newAlarm);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const newProps = req.body as Partial<AlarmType>;

  const existing = await Alarm.findByPk(Number(id));
  if (!existing) {
    res.status(404).json({
      error: "Alarm not found",
    });
    return;
  }

  await Alarm.update(newProps, { where: { id: Number(id) } });

  const updated = await Alarm.findByPk(Number(id));

  res.status(200).json(updated);
});

export default router;
