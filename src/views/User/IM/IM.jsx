import React, { useRef, useState } from "react";
import { Button, Popover, Tooltip, Comment, Avatar, Card } from "antd";
import {
  MessageTwoTone,
  MessageOutlined,
  PhoneOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";
import useStyles from "./IM.style";
import getContent from "../Chat/ChatInput/getContent";
import UserSocket from "./UserSocket";
import * as MessageUtil from "../../../utils/MessageUtil";
import Video from "./Video";
import userAvatar from "../../../assets/tim.png";
import avatar from "../../../assets/head.png";

export default function IM() {
  const classes = useStyles();
  const input = useRef(null);
  const [messageList, setMessageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [callType, setCallType] = useState(null);
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
    console.warn("receive message: ", message);
    setMessageList(item => {
      if (item instanceof Array) {
        return [...item, message];
      }
      return [];
    });
  };

  const onHandleCallEvent = message => {
    setCallType(message.payload.text);
  };

  const display = callType ? "block" : "none";

  const zIndex = callType === null ? -1 : 9;

  React.useEffect(() => {
    UserSocket.on("message", onHandleMessage);
    UserSocket.on("call", onHandleCallEvent);
  }, []);
  React.useEffect(() => {
    UserSocket.open();
    return () => {
      UserSocket.close();
    };
  }, []);

  React.useEffect(() => {
    MessageUtil.scrollToBottom("userMessageWrapper");
  }, [messageList.length]);

  return (
    <>
      <Video
        loading={loading}
        callType={callType}
        display={display}
        zIndex={zIndex}
        setCallType={setCallType}
        setMessageList={setMessageList}
      />
      <div className={classes.im}>
        <div id={"userMessageWrapper"} className={classes.messageWrapper}>
          {messageList?.map((item, key) => {
            console.log(item);
            const out = item.flow === "out";
            return (
              item?.payload?.text && (
                <Comment
                  key={key}
                  className={out ? classes.ownMessage : ""}
                  author={<a>{item.from}</a>}
                  avatar={<Avatar src={out ? userAvatar : avatar} />}
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
              )
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
          {/* <Button
            type="primary"
            className={classes.peerButton}
            icon={<PhoneOutlined />}
            onClick={() => UserSocket.getPeers()}
          ></Button>
          <Button
            type="danger"
            className={classes.callButton}
            icon={<PhoneOutlined />}
            onClick={() => UserSocket.startLocalVideo()}
          ></Button> */}
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
    </>
  );
}

export function IMWithButton() {
  const classes = useStyles();
  return (
    <Popover
      placement={"topLeft"}
      trigger={"click"}
      className={classes.popover}
      content={<IM />}
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

export function IMWithCard() {
  const classes = useStyles();
  return (
    <div className={classes.cardWrapper}>
      <Card
        hoverable
        className={classes.card}
        bodyStyle={{
          width: "100%",
          height: "100%"
        }}
      >
        <IM />
      </Card>
    </div>
  );
}
