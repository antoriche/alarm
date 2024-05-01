import React from "react";
import { Alarm as AlarmType } from "shared/Alarm";
import style from "./Alarm.module.css";
import { Button, ConfigProvider, Switch } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

type AlarmProps = {
  alarm: AlarmType;
  setActive?: (active: boolean) => void;
  onDelete?: () => void;
};
const Alarm: React.FC<AlarmProps> = ({ alarm, setActive, onDelete }) => {
  return (
    <div className={style.alarm}>
      <div>
        <span className={style.time}>{alarm.time}</span>
        {"  "}
        {alarm.name && <small className={style.name}>{alarm.name}</small>}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1em",
        }}
      >
        {!alarm.active && <Button type="link" danger onClick={onDelete} icon={<DeleteOutlined />} />}

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
