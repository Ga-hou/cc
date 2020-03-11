import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Avatar, Dropdown, Menu } from "antd";
import useStyles from "./TopBar.style";
const { Header } = Layout;
import { delUserInfo } from "../../store/userInfo/action";

export default function TopBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { id } = useSelector(e => e.userInfo);
  const logout = () => {
    dispatch(delUserInfo());
    history.push("/login");
  };

  const unLine = () => {
    history.push("/online");
  };

  return (
    <Header className={classes.TopBar}>
      <Dropdown
        overlay={
          <Menu>
            {location.pathname !== "/online" && (
              <Menu.Item onClick={unLine}>下线</Menu.Item>
            )}
            <Menu.Item onClick={logout}>退出</Menu.Item>
          </Menu>
        }
      >
        <Avatar size={50} icon={<UserOutlined />} />
      </Dropdown>
      <div className={classes.userInfo}>
        <span className={classes.userId}>工号: {id}</span>
      </div>
    </Header>
  );
}
