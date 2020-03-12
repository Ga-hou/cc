import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { PageHeader, Card, Table, Button } from "antd";
import { services } from "../../../services";
import { userRoleMap } from "../../../utils/enums";
import AddGroupUser from "./AddGroupUser";
import useStyles from "./style";
const { Column } = Table;
export default function Group() {
  const classes = useStyles();
  const history = useHistory();
  const { groupId } = useParams();
  const [title, setTitle] = React.useState(null);
  const [userList, setUserList] = React.useState(null);

  const onHandleBack = () => {
    history.push("/admin/user-group");
  };

  const onRequestDetail = () => {
    services("/group/detail", {
      groupId
    })
      .then(res => {
        setTitle(res.data.groupName);
        setUserList(res.data.user);
      })
      .catch(() => {});
  };
  React.useEffect(() => {
    onRequestDetail();
  }, []);
  return (
    <>
      <PageHeader title={title} subTitle={"客服组详情"} onBack={onHandleBack} />
      <Card
        title={
          <AddGroupUser
            userList={userList}
            groupName={title}
            request={onRequestDetail}
          />
        }
      >
        <Table dataSource={userList}>
          <Column title={"工号"} dataIndex={"id"} key={"id"} />
          <Column title={"邮箱"} dataIndex={"account"} key={"account"} />
          <Column title={"姓名"} dataIndex={"username"} key={"username"} />
          <Column
            title={"用户类型"}
            dataIndex={"roleId"}
            key={"roleId"}
            render={(item, record) => {
              return userRoleMap[item];
            }}
          />
        </Table>
      </Card>
    </>
  );
}
