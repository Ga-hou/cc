import React from "react";
import useStyles from "./Video.style";
export default function Video() {
  const classes = useStyles();
  return (
    <div className={classes.local} id="remote-video-wrapper">
      {/* <video className={classes.localVideo} id="im-local-video" autoPlay /> */}
      {/* <video className={classes.remoteVideo} id="im-remote-video" autoPlay /> */}
    </div>
  );
}
