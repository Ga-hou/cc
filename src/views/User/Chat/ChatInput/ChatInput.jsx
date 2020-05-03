import React, { useRef } from "react";
import { MessageOutlined } from "@ant-design/icons";
import { Button } from "antd";
import useStyles from "./ChatInput.style";
import IM from "../../../../utils/AgentSocket";
import getContent from "./getContent";
export default function ChatInput() {
  const classes = useStyles();
  const input = useRef(null);
  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onHandleSend();
    }
  };

  const onHandleSend = () => {
    if (getContent(input.current.childNodes) !== "") {
      IM.send(getContent(input.current.childNodes));
    }
    input.current.innerHTML = "";
  };

  return (
    <div className={classes.chatInputWrapper}>
      <div
        className={classes.chatInput}
        contentEditable
        onKeyDown={handleKeyDown}
        ref={input}
      />
      <Button
        type="primary"
        size="large"
        icon={<MessageOutlined />}
        className={classes.sendButton}
        onClick={onHandleSend}
      >
        发送
      </Button>
    </div>
  );
}
