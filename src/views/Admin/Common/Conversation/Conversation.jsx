import React from "react";
import { Card, Input, Form } from "antd";
export default function Conversation() {
  return (
    <Card>
      <Form size={"large"}>
        <Form.Item label={"欢迎语"}>
          <Input maxLength={400} />
        </Form.Item>
      </Form>
    </Card>
  );
}
