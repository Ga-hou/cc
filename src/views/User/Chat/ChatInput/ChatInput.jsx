import React from "react";
import { Button } from "antd";
import useStyles from "./ChatInput.style";
import IM from "../../../../utils/IM";
export default function ChatInput() {
  const classes = useStyles();

  const handleKeyPress = e => {
    console.log(e);
    IM.send();
  };

  return (
    <div
      className={classes.chatInput}
      contentEditable
      onKeyPress={handleKeyPress}
    >
      <Button
        type="primary"
        size="large"
        icon="message"
        className={classes.sendButton}
      >
        发送
      </Button>
    </div>
  );
}
