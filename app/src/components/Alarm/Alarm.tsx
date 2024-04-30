import React from "react";
import { Alarm as AlarmType } from "shared/Alarm";
import style from "./Alarm.module.css";
import { ConfigProvider, Switch } from "antd";

type AlarmProps = {
  alarm: AlarmType;
  setActive?: (active: boolean) => void;
};
const Alarm: React.FC<AlarmProps> = ({ alarm, setActive }) => {
  return (
    <div className={style.alarm}>
      <div>
        <span className={style.time}>{alarm.time}</span>
        {"  "}
        {alarm.name && <small className={style.name}>{alarm.name}</small>}
      </div>
      <div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#228B22",
            },
          }}
        >
          <Switch checked={alarm.active} onChange={setActive} />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Alarm;
