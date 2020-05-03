import React from "react";
import {
  Table,
  message,
  Button,
  Modal,
  Form,
  Input,
  Radio,
  Select
} from "antd";
import ResetPassword from "./ResetPassword";
import { services } from "../../../services";
import { userRoleMap } from "../../../utils/enums";
import useStyles, { style } from "./style";
const { Column } = Table;

export default function User() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [modalLoading, setModalLoading] = React.useState(false);
  const [selectLoading, setSelectLoading] = React.useState(false);
  const [userList, setUserList] = React.useState(null);
  const [groupList, setGroupList] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const [form] = Form.useForm();

  const onHandleShowModal = () => {
    setVisible(true);
  };
  const onHandleHideModal = () => {
    setVisible(false);
    setCurrentUser(null);
    form.resetFields();
  };

  const onHandleEditUser = record => {
    form.setFieldsValue({
      account: record.account,
      username: record.username,
      roleId: record.roleId,
      groupIdList: record.userGroup?.map(item => item.groupId)
    });
    setCurrentUser(record);
    onHandleShowModal();
  };

  const onHandleAddUser = () => {
    setVisible(true);
  };

  const onHandleSubmit = values => {
    if (currentUser) onRequestUpdateUserInfo(values);
    else onRequestAddUser(values);
  };

  const getUserList = () => {
    setLoading(true);
    services("user/list").then(e => {
      setLoading(false);
      setUserList(e.data.userList);
    });
  };

  const getGroupUser = () => {
    setSelectLoading(true);
    services("group/list")
      .then(e => {
        setGroupList(e.data.groupList);
        setSelectLoading(false);
      })
      .catch(() => {
        setSelectLoading(false);
      });
  };

  const onRequestUpdateUserInfo = values => {
    setModalLoading(true);
    services("user/update", values)
      .then(res => {
        setModalLoading(false);
        message.success(res.data.msg);
        onHandleHideModal();
        getUserList();
      })
      .catch(() => {
        setModalLoading(false);
      });
  };

  const onRequestAddUser = values => {
    setModalLoading(true);
    services("user/register", values)
      .then(() => {
        setModalLoading(false);
        message.success("添加成功，请联系客服查看邮箱");
        onHandleHideModal();
        getUserList();
      })
      .catch(() => {
        setModalLoading(false);
      });
  };

  React.useEffect(() => {
    getUserList();
  }, []);

  React.useEffect(() => {
    if (visible) {
      getGroupUser();
    }
  }, [visible]);

  return (
    <div>
      <Button
        type={"primary"}
        onClick={onHandleAddUser}
        className={classes.addAction}
      >
        添加客服
      </Button>
      <Table loading={loading} dataSource={userList}>
        <Column title={"工号"} dataIndex={"id"} key={"id"} />
        <Column title={"邮箱"} dataIndex={"account"} key={"account"} />
        <Column title={"姓名"} dataIndex={"username"} key={"username"} />
        <Column
          title={"用户类型"}
          dataIndex={"roleId"}
          key={"roleId"}
          render={item => userRoleMap[item]}
        />
        <Column
          title={"所属客服组"}
          dataIndex={"userGroup"}
          key={"userGroup"}
          render={item => item.map(item => item.groupName).join(",")}
        />
        <Column
          title={"操作"}
          dataIndex={"operator"}
          key={"operator"}
          render={(item, record) => {
            return (
              <>
                <Button type={"link"} onClick={() => onHandleEditUser(record)}>
                  编辑
                </Button>
                <Button
                  type={"link"}
                  danger
                  onClick={() => ResetPassword(record.id)}
                >
                  重置密码
                </Button>
              </>
            );
          }}
        />
      </Table>
      <Modal
        forceRender
        visible={visible}
        confirmLoading={modalLoading}
        title={currentUser ? "编辑客服" : "添加客服"}
        width={420}
        onCancel={onHandleHideModal}
        onOk={() => form.submit()}
        okText={"确定"}
        cancelText={"取消"}
        okButtonProps={{
          htmlType: "submit"
        }}
      >
        <Form
          form={form}
          onFinish={onHandleSubmit}
          labelCol={{
            span: 6
          }}
        >
          <Form.Item
            label={"邮箱"}
            name={"account"}
            rules={[
              { required: true, message: "请输入邮箱地址!" },
              {
                type: "email",
                message: "邮箱格式不正确"
              }
            ]}
          >
            <Input className={classes.formInput} disabled={currentUser} />
          </Form.Item>
          <Form.Item
            label={"姓名"}
            name={"username"}
            rules={[
              {
                required: true,
                message: "姓名不能为空"
              }
            ]}
          >
            <Input className={classes.formInput} />
          </Form.Item>
          <Form.Item label={"客服组"} name={"groupIdList"}>
            <Select
              style={style.formSelect}
              mode={"multiple"}
              size={"middle"}
              allowClear
              loading={selectLoading}
            >
              {groupList?.map(item => (
                <Select.Option value={item.groupId}>
                  {item.groupName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={"用户类型"}
            name={"roleId"}
            rules={[
              {
                required: true,
                message: "用户类型不能为空"
              }
            ]}
          >
            <Radio.Group>
              <Radio.Button value={1}>管理员</Radio.Button>
              <Radio.Button value={2}>用户</Radio.Button>
              <Radio.Button value={3}>质检员</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
