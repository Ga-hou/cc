import React from "react";
import { Avatar, Button } from "antd";
import { VideoCameraOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./ChatTitle.style";
import { delSocketRoom, setVideoRoom } from "../../../../store/socket/action";
import avatar from "../../../../assets/tim.png";
export default function Chat() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentRoom } = useSelector(e => e.socket);
  const closeCurrentRoom = () => {
    dispatch(delSocketRoom());
  };
  const startVideoRoom = () => {
    dispatch(setVideoRoom());
  };
  return (
    <div className={classes.chatTitle}>
      <Avatar size="large" src={avatar} />
      <div className={classes.roomInfo}>房间: {currentRoom.roomName}</div>
      <Button
        className={classes.finishButton}
        type="primary"
        shape="round"
        size="large"
        onClick={startVideoRoom}
        icon={<VideoCameraOutlined />}
      />
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
