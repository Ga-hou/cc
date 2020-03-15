import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Table } from "antd";
import AddUserGroup from "./AddUserGroup";
import { services } from "../../../services";
import DelUserGroup from "./DelUserGroup";

const { Column } = Table;
export default function UserGroup() {
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [groupList, setGroupList] = React.useState(null);
  const onHandleNavigate = groupId => {
    history.push(`/admin/user-group/${groupId}`);
  };

  const onRequestGroupList = () => {
    setLoading(true);
    services("/group/list")
      .then(e => {
        setLoading(false);
        setGroupList(e.data.groupList);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onRequestDelGroup = groupId => {
    DelUserGroup(groupId, onRequestGroupList);
  };

  React.useEffect(() => {
    onRequestGroupList();
  }, []);
  return (
    <div>
      <AddUserGroup request={onRequestGroupList} />
      <Table loading={loading} dataSource={groupList}>
        <Column title={"名称"} dataIndex={"groupName"} key={"groupName"} />
        <Column
          title={"操作"}
          dataIndex={"operator"}
          key={"operator"}
          render={(item, record) => {
            return (
              <>
                <Button
                  type={"link"}
                  onClick={() => onHandleNavigate(record.groupId)}
                >
                  查看客服组
                </Button>
                <Button
                  type={"link"}
                  danger
                  onClick={() => onRequestDelGroup(record.groupId)}
                >
                  删除
                </Button>
              </>
            );
          }}
        />
      </Table>
    </div>
  );
}
