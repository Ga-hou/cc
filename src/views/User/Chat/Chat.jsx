import React from "react";
import { Card } from "antd";
import useStyles from "./Chat.style";
import ChatTitle from "./ChatTitle/ChatTitle";
import ChatInput from "./ChatInput/ChatInput";
import ChatMessageList from "./ChatMessageList/ChatMessageList";

export default function Chat() {
  const classes = useStyles();
  return (
    <Card
      className={classes.chat}
      bodyStyle={{
        padding: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "calc(100vh - 138px)",
        overflow: "scroll"
      }}
      title={<ChatTitle />}
    >
      <ChatMessageList />
      <ChatInput />
    </Card>
  );
}
