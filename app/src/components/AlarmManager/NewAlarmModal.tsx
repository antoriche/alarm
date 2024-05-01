import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Row, TimePicker } from "antd";
import React from "react";
import { Alarm } from "shared/Alarm";
import getAPI from "../../services/api";
import { useAlarms } from "../../hooks/alarm";

type NewAlarmModalProps = {};
const NewAlarmModal: React.FC<NewAlarmModalProps> = ({}) => {
  const [submitting, setSubmitting] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [form] = Form.useForm<Partial<Omit<Alarm, "id" | "active">>>();
  const { refetch } = useAlarms();

  return (
    <>
      <Modal title="New Alarm" open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} footer={null}>
        <Form
          form={form}
          onFinish={async (values) => {
            setSubmitting(true);
            try {
              await form.validateFields();
              const api = await getAPI();
              await api.post("/alarms", { ...values });
              form.resetFields();
              refetch();
              setOpen(false);
            } catch (e) {
              console.error(e);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item
            label="Time"
            name="time"
            required
            rules={[
              {
                required: true,
                message: "Please select a time",
              },
            ]}
          >
            <TimePicker format="HH:mm" allowClear={false} needConfirm={false} showNow={false} />
          </Form.Item>
          <Row justify="end">
            <Button type="primary" htmlType="submit" loading={submitting}>
              Create
            </Button>
          </Row>
        </Form>
      </Modal>
      <Button
        style={{ backgroundColor: "transparent" }}
        type="dashed"
        icon={<PlusOutlined />}
        onClick={() => {
          form.resetFields();
          setOpen(true);
        }}
      >
        New Alarm
      </Button>
    </>
  );
};

export default NewAlarmModal;
