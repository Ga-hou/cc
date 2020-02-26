import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Layout, Avatar, Dropdown, Menu } from "antd";
import useStyles from "./TopBar.style";
const { Header } = Layout;
import { delUserInfo } from "../../store/userInfo/action";

export default function TopBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const logout = () => {
    dispatch(delUserInfo());
    history.push("/login");
  };

  return (
    <Header className={classes.TopBar}>
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item>下线</Menu.Item>
            <Menu.Item onClick={logout}>退出</Menu.Item>
          </Menu>
        }
      >
        <Avatar size={50} icon="user" />
      </Dropdown>
    </Header>
  );
}
