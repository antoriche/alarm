import React, { useMemo } from "react";
import style from "./AlarmManager.module.css";
import { useAlarms } from "../../hooks/alarm";
import Alarm from "../Alarm/Alarm";
import { ClockCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useNow } from "../../hooks/time";
import NewAlarmModal from "./NewAlarmModal";
import { Alarm as AlarmType } from "shared/Alarm";
import getAPI from "../../services/api";

const AlarmManager = () => {
  const { data: alarms, refetch } = useAlarms();
  const now = useNow();

  const activeAlarms = useMemo(
    () => alarms?.filter((alarm) => alarm.active).sort((a, b) => dayjs(a.time, "HH:mm").diff(dayjs(b.time, "HH:mm"))) || [],
    [alarms],
  );

  const inactiveAlarms = useMemo(
    () => alarms?.filter((alarm) => !alarm.active).sort((a, b) => dayjs(a.time, "HH:mm").diff(dayjs(b.time, "HH:mm"))) || [],
    [alarms],
  );

  const nextAlarm: AlarmType | null = activeAlarms.filter((alarm) => dayjs(alarm.time, "HH:mm").isAfter(now))[0] || activeAlarms[0] || null;

  async function setActive(id: AlarmType["id"], active: boolean) {
    const api = await getAPI();
    await api.patch(`/alarms/${id}`, { active });
    refetch();
  }

  async function deleteAlarm(id: AlarmType["id"]) {
    const api = await getAPI();
    await api.delete(`/alarms/${id}`);
    refetch();
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.header}>
          <h2>
            <ClockCircleOutlined style={{ marginRight: "0.5em" }} /> Alarms
          </h2>
          <NewAlarmModal />
        </div>
        {(activeAlarms.length || null) && (
          <div className={style.active_alarms}>
            <div className={style.active_header}>
              {nextAlarm && (
                <span>
                  Next in{" "}
                  <strong>
                    {dayjs(nextAlarm.time, "HH:mm")
                      .add(dayjs(nextAlarm.time, "HH:mm").isBefore(now) ? 1 : 0, "day")
                      .from(now, true)}
                  </strong>
                </span>
              )}
            </div>
            <div className={style.list}>
              {activeAlarms.map((alarm) => (
                <Alarm
                  key={alarm.id}
                  alarm={alarm}
                  setActive={async (active) => {
                    await setActive(alarm.id, active);
                  }}
                  onDelete={async () => {
                    await deleteAlarm(alarm.id);
                  }}
                />
              ))}
            </div>
          </div>
        )}
        {(inactiveAlarms.length || null) && (
          <div
            style={{
              marginTop: "1em",
            }}
          >
            <h2 style={{ fontSize: "1em", color: "grey" }}>Disabled</h2>
            <div className={style.inactive_alarms}>
              {inactiveAlarms.map((alarm) => (
                <Alarm
                  key={alarm.id}
                  alarm={alarm}
                  setActive={async (active) => {
                    await setActive(alarm.id, active);
                  }}
                  onDelete={async () => {
                    await deleteAlarm(alarm.id);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AlarmManager;
