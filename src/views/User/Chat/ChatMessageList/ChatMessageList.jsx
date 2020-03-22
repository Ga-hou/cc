import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Comment, Tooltip, Avatar } from "antd";
import dayjs from "dayjs";
import useStyles from "./ChatMessage.style";

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default function ChatMessageList() {
  const classes = useStyles();
  const socket = useSelector(e => e.socket);
  const currentRoomMessage = usePrevious(socket.currentRoomMessage);
  const { username } = useSelector(e => e.userInfo);
  const messageEndRef = React.useRef(null);

  React.useEffect(() => {
    messageEndRef &&
      messageEndRef.current &&
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [currentRoomMessage]);

  return (
    <div className={classes.chatMessageList}>
      {currentRoomMessage?.map((item, key) => {
        const out = username === item.username;
        return (
          <Comment
            key={key}
            className={out && classes.ownMessage}
            author={<a>{item.username}</a>}
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            content={
              <p className={out && classes.outContent}>{item.message}</p>
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
        );
      })}
      <div className={classes.messageEnd} ref={messageEndRef} />
    </div>
  );
}
