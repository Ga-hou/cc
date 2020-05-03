import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Comment, Tooltip, Avatar } from "antd";
import dayjs from "dayjs";
import useStyles from "./ChatMessage.style";
import avatar from "../../../../assets/head.png";
import userAvatar from "../../../../assets/tim.png";
import * as MessageUtil from "../../../../utils/MessageUtil";

export default function ChatMessageList() {
  const classes = useStyles();
  const { currentRoomMessage, currentRoom, roomMessage } = useSelector(
    e => e.socket
  );
  const { username } = useSelector(e => e.userInfo);

  React.useEffect(() => {
    MessageUtil.scrollToBottom("agentMessageWrapper");
  }, [roomMessage[currentRoom.roomId].length]);
  return (
    <div id="agentMessageWrapper" className={classes.chatMessageList}>
      {currentRoom &&
        currentRoom.roomId &&
        roomMessage[currentRoom.roomId]
          // ?.filter(e => e.from === e.to)
          .map((item, key) => {
            const out = username === item.username;
            return (
              item?.payload?.text && (
                <Comment
                  key={key}
                  className={out && classes.ownMessage}
                  author={<a>{item.username}</a>}
                  avatar={<Avatar src={out ? avatar : userAvatar} />}
                  content={
                    <p className={out && classes.outContent}>
                      {item?.payload?.text}
                    </p>
                  }
                  datetime={
                    <Tooltip
                      title={dayjs(item.postedOn).format("YYYY-MM-DD HH:mm:ss")}
                    >
                      <span>
                        {dayjs(item.postedOn).format("YYYY-MM-DD HH:mm:ss")}
                      </span>
                    </Tooltip>
                  }
                />
              )
            );
          })}
      <div className={classes.messageEnd} />
    </div>
  );
}
