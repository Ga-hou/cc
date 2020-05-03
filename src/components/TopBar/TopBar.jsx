import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Avatar, Dropdown, Menu, Typography } from "antd";
import useStyles from "./TopBar.style";
import { delUserInfo } from "../../store/userInfo/action";
import avatar from "../../assets/head.png";

const { Header } = Layout;

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
      <Typography.Title level={3} type="warning" className={classes.title}>
        基于WebRTC的客服系统
      </Typography.Title>
      <Dropdown
        placement={"bottomCenter"}
        overlay={
          <Menu className={classes.menu}>
            {location.pathname !== "/online" && (
              <Menu.Item onClick={unLine}>下线</Menu.Item>
            )}
            <Menu.Item onClick={logout}>退出</Menu.Item>
          </Menu>
        }
      >
        <Avatar size={50} src={avatar} />
      </Dropdown>
    </Header>
  );
}
