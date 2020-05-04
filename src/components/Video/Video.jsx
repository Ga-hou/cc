import React from "react";
import { useSelector } from "react-redux";
import Draggable from "react-draggable";
import { Card } from "antd";
import useStyles from "./Video.style";
export default function Video() {
  const classes = useStyles();
  const { videoRoom } = useSelector(e => e.socket);
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
          <div className={classes.remoteVideo} id="agent-remote-video"></div>
        </div>
      </Card>
    </Draggable>
  );
}
