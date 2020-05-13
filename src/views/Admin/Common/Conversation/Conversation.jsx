import React, { useState } from "react";
import { Card, Input, Form, List, Switch, Table } from "antd";

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

export default function Conversation() {
  const [list, setList] = useState([1, 2]);
  return (
    <Card>
      <Table
        bordered
        dataSource={list}
        columns={[
          {
            title: "场景",
            dataIndex: "scenes",
            editable: true
          }
        ]}
      ></Table>
    </Card>
  );
}
