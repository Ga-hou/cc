import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Button, Descriptions } from "antd";
import { useSelector } from "react-redux";
import BaseLayout from "../components/BaseLayout/BaseLayout";
import TopBar from "../components/TopBar/TopBar";
import useStyles from "./Online.style";
import { userRoleMap } from "../utils/enums";
export default function Online() {
  const classes = useStyles();
  const history = useHistory();
  const { username, userRoles } = useSelector(e => e.userInfo);
  return (
    <BaseLayout>
      <TopBar />
      <Card className={classes.online}>
        <Descriptions title="用户信息" column={1}>
          <Descriptions.Item label="账号">{username}</Descriptions.Item>
          <Descriptions.Item label="用户类型">
            {userRoles.length === 0 ? "无" : userRoleMap[userRoles.roleId]}
          </Descriptions.Item>
        </Descriptions>
        <div className={classes.buttonWrapper}>
          <Button
            type="primary"
            className={classes.button}
            block
            onClick={() => history.push("/user")}
          >
            上线
          </Button>
          {userRoles.roleId === 1 && (
            <Button
              className={classes.button}
              onClick={() => history.push("/admin")}
            >
              管理端
            </Button>
          )}
        </div>
      </Card>
    </BaseLayout>
  );
}
