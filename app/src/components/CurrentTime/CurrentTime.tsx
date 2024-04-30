import React from "react";
import { useNow } from "../../hooks/time";
import Clock from "react-clock";
import dayjs from "dayjs";
import "react-clock/dist/Clock.css";

const CurrentTime = () => {
  const now: Date = useNow();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          fontSize: "2em",
          fontWeight: "bold",
        }}
      >
        {dayjs(now).format("D MMMM YYYY")}
      </div>

      <div
        style={{
          padding: 5,
        }}
      >
        <Clock value={now} />
      </div>

      <div
        style={{
          fontSize: "3em",
          fontWeight: "bold",
        }}
      >
        {dayjs(now).format("HH:mm")}
      </div>
    </div>
  );
};

export default CurrentTime;
