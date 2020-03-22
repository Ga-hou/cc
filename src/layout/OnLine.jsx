import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Button, Descriptions } from "antd";
import { useSelector, useDispatch } from "react-redux";
import BaseLayout from "../components/BaseLayout/BaseLayout";
import TopBar from "../components/TopBar/TopBar";
import useStyles from "./Online.style";
import { userRoleMap } from "../utils/enums";
import { services } from "../services";
import { setUserInfo } from "../store/userInfo/action";

export default function Online() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { account, username, roleId } = useSelector(e => e.userInfo);
  React.useEffect(() => {
    services("/user/profile").then(res => {
      dispatch(
        setUserInfo({
          id: res.data.user.id,
          account: res.data.user.account,
          username: res.data.user.username,
          roleId: res.data.user.roleId
        })
      );
    });
  }, []);
  return (
    <BaseLayout>
      <TopBar />
      <Card className={classes.online}>
        <Descriptions title="用户信息" column={1}>
          <Descriptions.Item label="账号">{account}</Descriptions.Item>
          <Descriptions.Item label="用户名">{username}</Descriptions.Item>
          <Descriptions.Item label="用户类型">
            {!roleId ? "无" : userRoleMap[roleId]}
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
          {roleId === 1 && (
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
