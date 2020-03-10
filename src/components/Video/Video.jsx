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
        style={videoRoom ? { display: "block" } : { display: "none" }}
      >
        <div className={classes.local} id="video">
          <video className={classes.video} id="local-video" autoPlay />
        </div>
      </Card>
    </Draggable>
  );
}
