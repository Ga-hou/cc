import React from "react";
import { useSelector } from "react-redux";
import Draggable from "react-draggable";
import { Card, Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import useStyles from "./Video.style";
import { useDispatch } from "react-redux";
import { stopVideoCall } from "../../store/socket/action";
import AgentSocket from "../../utils/AgentSocket";

export default function Video() {
  const classes = useStyles();
  const { videoRoom, callType } = useSelector(e => e.socket);
  const dispatch = useDispatch();
  const onHandleCloseVideo = () => {
    dispatch(stopVideoCall());
    AgentSocket.sendCallMessage(null);
    AgentSocket.send("通话已结束");
  };

  return (
    <Draggable>
      <Card
        className={classes.videoCard}
        bodyStyle={{
          width: 800,
          height: 500
        }}
        style={videoRoom ? { display: "block" } : { display: "none" }}
      >
        <div className={classes.videoWrapper}>
          <video
            className={classes.localVideo}
            id="agent-local-video"
            autoPlay
          />
          <div
            className={classes.remoteVideo}
            id="agent-remote-video"
            style={{
              display: callType === "answer" ? "block" : "none"
            }}
          ></div>
          <div className={classes.callingVideo}>
            {callType === "calling" && "呼叫中"}
          </div>
          <Button
            className={classes.closeButton}
            icon={<CloseCircleOutlined />}
            type="danger"
            shape="circle"
            size="large"
            onClick={onHandleCloseVideo}
          ></Button>
        </div>
      </Card>
    </Draggable>
  );
}
