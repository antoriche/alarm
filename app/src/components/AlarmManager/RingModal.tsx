import { Button, Modal, Row } from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { Alarm } from "shared/Alarm";
import { registerAlarm, ring } from "../../services/alarm";
import { useToday } from "../../hooks/time";
import { useAlarms } from "../../hooks/alarm";

type RingModalProps = {};
const RingModal: React.FC<RingModalProps> = ({}) => {
  const { data: alarms = [] } = useAlarms();
  const [ringing, setRinging] = React.useState<false | Alarm>(false);
  const today = useToday();

  useEffect(() => {
    const unregisters = alarms
      .filter((alarm) => alarm.active)
      .map((alarm) => {
        let alarmDatetime = dayjs(alarm.time, "HH:mm");
        if (alarmDatetime.isBefore(dayjs(today))) {
          alarmDatetime.add(1, "day");
        }
        return registerAlarm(alarmDatetime.toDate(), () => {
          setRinging(alarm);
        });
      });
    return () => unregisters.forEach((unregister) => unregister());
  }, [alarms, today]);

  useEffect(() => {
    if (ringing) {
      return ring();
    }
  }, [ringing]);

  return (
    <Modal title="Time's up!" open={ringing !== false} footer={null} closable={false} maskClosable={false}>
      {ringing && <p>{ringing.name || `It's ${dayjs(ringing.time, "HH:mm").format("HH:mm")}`}</p>}
      <Row justify="end">
        <Button type="primary" onClick={() => setRinging(false)}>
          Dismiss
        </Button>
      </Row>
    </Modal>
  );
};

export default RingModal;
