import React from "react";
import { useParams } from "react-router-dom";
import { Modal, Button, Form, Select, Input, message } from "antd";
import useStyles, { style } from "./style";
import { services } from "../../../services";

export default function AddGroupUser(props) {
  const classes = useStyles();
  const { groupId } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [modalVisible, setModalVisiable] = React.useState(false);
  const [allUserList, setAllUserList] = React.useState(null);
  const [form] = Form.useForm();

  const onHandleSubmit = values => {
    setLoading(true);
    services("/group/update", {
      groupId,
      ...values
    })
      .then(res => {
        setLoading(false);
        onHandleHideModal();
        props?.request();
        message.success(res.data.msg);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onHandleShowModal = () => {
    setModalVisiable(true);
  };

  const onHandleHideModal = () => {
    setModalVisiable(false);
    form.resetFields();
    setAllUserList(null);
  };
  React.useEffect(() => {
    if (modalVisible) {
      form.setFieldsValue({
        groupName: props.groupName,
        userIdList: props?.userList?.map(item => item.id)
      });
    }
  }, [modalVisible]);

  React.useEffect(() => {
    if (modalVisible) {
      services("/user/list").then(res => {
        setAllUserList(res.data.userList);
      });
    }
  }, [modalVisible]);
  return (
    <>
      <Button
        size={"middle"}
        type={"primary"}
        className={classes.addButton}
        onClick={onHandleShowModal}
      >
        修改客服组
      </Button>
      <Modal
        forceRender
        confirmLoading={loading}
        width={420}
        title={"修改客服组"}
        visible={modalVisible}
        onOk={() => form.submit()}
        onCancel={onHandleHideModal}
      >
        <Form
          labelCol={{
            span: 6
          }}
          size={"middle"}
          form={form}
          onFinish={onHandleSubmit}
        >
          <Form.Item label={"名称"} name={"groupName"}>
            <Input className={classes.formInput} />
          </Form.Item>
          <Form.Item label={"客服"} name={"userIdList"}>
            <Select
              style={style.formSelect}
              mode={"multiple"}
              size={"middle"}
              allowClear
            >
              {allUserList?.map((item, key) => (
                <Select.Option key={key} value={item.id}>
                  {item.username}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
