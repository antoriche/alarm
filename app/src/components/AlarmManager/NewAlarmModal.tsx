import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Row, TimePicker } from "antd";
import React from "react";
import { Alarm } from "shared/Alarm";

type NewAlarmModalProps = {};
const NewAlarmModal: React.FC<NewAlarmModalProps> = ({}) => {
  const [open, setOpen] = React.useState(false);
  const [form] = Form.useForm<Partial<Omit<Alarm, "id" | "active">>>();

  return (
    <>
      <Modal title="New Alarm" open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} footer={null}>
        <Form
          form={form}
          onFinish={async (values) => {
            await form.validateFields();
            console.log(values);
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
            <Button type="primary" htmlType="submit" onClick={() => form.submit()}>
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
