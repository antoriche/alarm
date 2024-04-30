import React from "react";
import style from "./AlarmManager.module.css";
import { useAlarms } from "../../hooks/alarm";
import Alarm from "../Alarm/Alarm";
import { ClockCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const AlarmManager = () => {
  const { data: alarms } = useAlarms();

  const nextAlarm = alarms?.filter((alarm) => alarm.active).sort((a, b) => dayjs(a.time, "HH:mm").diff(dayjs(b.time, "HH:mm")))[0];

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2>
          <ClockCircleOutlined style={{ marginRight: "0.5em" }} /> Alarms
        </h2>
        {nextAlarm && (
          <span
            style={{
              color: "grey",
            }}
          >
            Next in <strong>{dayjs(nextAlarm.time, "HH:mm").fromNow(true)}</strong>
          </span>
        )}
      </div>
      <div className={style.active_alarms}>
        {alarms
          ?.filter((alarm) => alarm.active)
          .sort((a, b) => dayjs(a.time, "HH:mm").diff(dayjs(b.time, "HH:mm")))
          .map((alarm) => <Alarm key={alarm.id} alarm={alarm} />)}
      </div>
      <div
        style={{
          marginTop: "1em",
        }}
      >
        <h2 style={{ fontSize: "1em", color: "grey" }}>Disabled</h2>
        <div className={style.inactive_alarms}>
          {alarms
            ?.filter((alarm) => !alarm.active)
            .sort((a, b) => dayjs(a.time, "HH:mm").diff(dayjs(b.time, "HH:mm")))
            .map((alarm) => <Alarm key={alarm.id} alarm={alarm} />)}
        </div>
      </div>
    </div>
  );
};

export default AlarmManager;
