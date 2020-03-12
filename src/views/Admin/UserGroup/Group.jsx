import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { PageHeader, Card, Table } from "antd";
import { services } from "../../../services";
import { userRoleMap } from "../../../utils/enums";

const { Column } = Table;
export default function Group() {
  const history = useHistory();
  const { groupId } = useParams();
  const [title, setTitle] = React.useState(null);
  const [userList, setUserList] = React.useState(null);
  const onHandleBack = () => {
    history.push("/admin/user-group");
  };
  React.useEffect(() => {
    services("/group/detail", {
      groupId
    })
      .then(res => {
        setTitle(res.data.groupName);
        setUserList(res.data.user);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  return (
    <>
      <PageHeader title={title} subTitle={"客服组详情"} onBack={onHandleBack} />
      <Card>
        <Table dataSource={userList}>
          <Column title={"工号"} dataIndex={"id"} key={"id"} />
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
