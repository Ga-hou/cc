import React from "react";
import { Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { services } from "../../../services";

const { confirm } = Modal;

export default function DelUserGroup(groupId, request) {
  confirm({
    title: "确定删除用户组？",
    icon: <ExclamationCircleOutlined />,
    content: "删除后，用户组将无法恢复，用户不会被删除",
    onOk() {
      return new Promise((resolve, reject) => {
        services("/group/delete", {
          groupId: groupId
        })
          .then(() => {
            message.success("删除成功");
            request();
            resolve();
          })
          .catch(err => reject(err));
      });
    },
    onCancel() {}
  });
}
