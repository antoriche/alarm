import React from "react";
import { useNow } from "../../hooks/time";
import Clock from "react-clock";
import dayjs from "dayjs";
import "react-clock/dist/Clock.css";
import style from "./CurrentTime.module.css";

const CurrentTime = () => {
  const now: Date = useNow();
  return (
    <div className={style.container}>
      <div className={style.date}>{dayjs(now).format("D MMMM YYYY")}</div>

      <div className={style.clock}>
        <Clock value={now} />
      </div>

      <div className={style.time}>{dayjs(now).format("HH:mm")}</div>
    </div>
  );
};

export default CurrentTime;
