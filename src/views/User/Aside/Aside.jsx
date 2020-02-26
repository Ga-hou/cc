import React from "react";
import { Menu, Avatar, Layout } from "antd";
import dayjs from "dayjs";
import useStyles from "./Aside.style";

export default function Aside() {
  const classes = useStyles();
  return (
    <Layout.Sider width={260}>
      <Menu className={classes.menu}>
        <Menu.Item className={classes.menuItem}>
          <Avatar icon="user" size={30} />
          <span>{dayjs().format("YYYY-MM-DD HH:mm:ss")}</span>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
}
