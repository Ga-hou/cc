import React from "react";
import { Button, Modal, Form, Input, Select, message } from "antd";
import { services } from "../../../services";
import useStyles, { style } from "./style";

const { Option } = Select;

export default function AddUserGroup(props) {
  const classes = useStyles();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalLoading, setModalLoading] = React.useState(false);
  const [userListLoading, setUserListLoading] = React.useState(false);
  const [userList, setUserList] = React.useState(null);
  const [form] = Form.useForm();

  const onHandleShowModal = () => {
    setModalVisible(true);
  };

  const onHandleHideModal = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const onHandleSubmit = values => {
    setModalLoading(true);
    services("/group/create", {
      groupName: values.groupName,
      userIdList: values.userIdList ? values.userIdList : []
    })
      .then(res => {
        setModalLoading(false);
        onHandleHideModal();
        message.success(res.data.msg);
        props?.request();
      })
      .catch(() => {
        setModalLoading(false);
      });
  };
  React.useEffect(() => {
    if (modalVisible) {
      setUserListLoading(true);
      services("/user/list")
        .then(res => {
          setUserListLoading(false);
          setUserList(res.data.userList);
        })
        .catch(() => {
          setUserListLoading(false);
        });
    }
  }, [modalVisible]);

  return (
    <>
      <Button
        type={"primary"}
        onClick={onHandleShowModal}
        className={classes.addAction}
      >
        添加客服组
      </Button>
      <Modal
        forceRender
        width={420}
        visible={modalVisible}
        confirmLoading={modalLoading}
        title={"添加客服组"}
        onOk={() => form.submit()}
        onCancel={onHandleHideModal}
        okText={"确定"}
        cancelText={"取消"}
      >
        <Form
          form={form}
          size={"middle"}
          labelCol={{
            span: 6
          }}
          onFinish={onHandleSubmit}
        >
          <Form.Item
            label={"名称"}
            name={"groupName"}
            rules={[
              {
                required: true,
                message: "名称不能为空"
              }
            ]}
          >
            <Input className={classes.formInput} />
          </Form.Item>
          <Form.Item label={"用户"} name={"userIdList"}>
            <Select
              style={style.formSelect}
              allowClear
              mode={"multiple"}
              size={"middle"}
              loading={userListLoading}
            >
              {userList?.map((item, key) => {
                return (
                  <Option value={item.id} key={key}>
                    {item.username}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
