import React, { useRef } from "react";
import { Button } from "antd";
import useStyles from "./ChatInput.style";
import IM from "../../../../utils/IM";
import getContent from "./getContent";
export default function ChatInput() {
  const classes = useStyles();
  const input = useRef(null);
  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      if (getContent(input.current.childNodes) !== "") {
        IM.send(getContent(input.current.childNodes));
      }
      e.preventDefault();
      input.current.innerHTML = "";
    }
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
        icon="message"
        className={classes.sendButton}
      >
        发送
      </Button>
    </div>
  );
}
