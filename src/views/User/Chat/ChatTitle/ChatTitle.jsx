import React from "react";
import { Avatar, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";

import useStyles from "./ChatTitle.style";
import { delSocketRoom } from "../../../../store/socket/action";

export default function Chat() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentRoom } = useSelector(e => e.socket);
  const closeCurrentRoom = () => {
    dispatch(delSocketRoom());
  };
  return (
    <div className={classes.chatTitle}>
      <Avatar size="large" icon="user" />
      <div className={classes.roomInfo}>房间: {currentRoom.roomName}</div>
      <Button
        className={classes.finishButton}
        type="danger"
        shape="round"
        size="large"
        onClick={closeCurrentRoom}
      >
        结束
      </Button>
    </div>
  );
}
