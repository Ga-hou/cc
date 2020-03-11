import React from "react";
import { Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { services } from "../../../services";

const { confirm } = Modal;
export default function ResetPassword(id) {
  confirm({
    title: "确定重置密码吗",
    icon: <ExclamationCircleOutlined />,
    content: "重置密码后，新密码将会发送到用户邮件",
    onOk() {
      return new Promise((resolve, reject) => {
        services("user/reset", {
          id: id
        })
          .then(res => {
            message.success(res.data.msg);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    onCancel() {}
  });
}
