import React from "react";
import { Avatar, Button } from "antd";
import useStyles from "./ChatTitle.style";

export default function Chat() {
  const classes = useStyles();
  return (
    <div className={classes.chatTitle}>
      <Avatar size="large" icon="user" />
      <Button type="danger" shape="round" size="large">
        结束
      </Button>
    </div>
  );
}
