import React, { useRef } from "react";
import { Button, Popover, Tooltip, Comment, Avatar } from "antd";
import { MessageTwoTone, MessageOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import useStyles from "./IM.style";
import getContent from "../Chat/ChatInput/getContent";
import UserSocket from "./UserSocket";
import * as MessageUtil from "../../../utils/MessageUtil";
export default function IM() {
  const classes = useStyles();
  const input = useRef(null);
  const [messageList, setMessageList] = React.useState([]);
  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onHandleSend();
    }
  };
  const onHandleSend = () => {
    if (getContent(input.current.childNodes) !== "") {
      setMessageList(item => {
        if (item instanceof Array) {
          return [
            ...item,
            UserSocket.send(getContent(input.current.childNodes))
          ];
        }
        return [];
      });
    }
    input.current.innerHTML = "";
  };

  const onHandleMessage = message => {
    console.log("receive message: ", message);
    setMessageList(item => {
      if (item instanceof Array) {
        return [...item, message];
      }
      return [];
    });
  };

  React.useEffect(() => {
    UserSocket.on("message", onHandleMessage);
  }, []);
  React.useEffect(() => {
    UserSocket.open();
    return () => {
      UserSocket.close();
    };
  }, []);

  React.useEffect(() => {
    MessageUtil.scrollToBottom();
  }, [messageList]);
  return (
    <Popover
      placement={"topLeft"}
      trigger={"click"}
      className={classes.popover}
      content={
        <div className={classes.im}>
          <div id={"messageWrapper"} className={classes.messageWrapper}>
            {messageList?.map((item, key) => {
              console.log(item);
              const out = item.flow === "out";
              return (
                <Comment
                  key={key}
                  className={out ? classes.ownMessage : ""}
                  author={<a>{item.from}</a>}
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  content={
                    <p className={out ? classes.outContent : ""}>
                      {item.payload.text}
                    </p>
                  }
                  datetime={
                    <Tooltip
                      title={dayjs(item.timestamp).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    >
                      <span>
                        {dayjs(item.timestamp).format("YYYY-MM-DD HH:mm:ss")}
                      </span>
                    </Tooltip>
                  }
                />
              );
            })}
          </div>
          <div className={classes.imInputWrapper}>
            <div
              className={classes.imInput}
              contentEditable
              onKeyDown={handleKeyDown}
              ref={input}
            />
            <Button
              type="primary"
              icon={<MessageOutlined />}
              className={classes.sendButton}
              onClick={onHandleSend}
            >
              发送
            </Button>
          </div>
        </div>
      }
    >
      <Button
        className={classes.imIcon}
        icon={<MessageTwoTone />}
        type={"primary"}
        size={"large"}
        shape={"circle"}
        ghost
      />
    </Popover>
  );
}
