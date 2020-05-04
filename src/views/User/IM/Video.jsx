import React, { useState } from "react";
import { Button, Spin } from "antd";
import PropTypes from "prop-types";
import useStyles from "./Video.style";
export default function Video(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  console.log(props);
  // if (props.loading) {
  //   return <div>加载中</div>;
  // }
  const onHandleAnswer = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      props.setCallType && props.setCallType("answer");
    }, 1500);
  };
  return (
    <div className={classes.videoWrapper} style={{ zIndex: props.zIndex }}>
      <Spin spinning={loading} wrapperClassName={classes.spin}>
        {props.callType === "calling" && (
          <>
            <Button className={classes.endButton} shape="circle" type="danger">
              挂断
            </Button>
            <Button
              className={classes.answerButton}
              shape="circle"
              type="primary"
              onClick={onHandleAnswer}
            >
              接听
            </Button>
          </>
        )}
        <div
          className={classes.remoteVideo}
          id="user-remote-video"
          style={{ display: props.callType === "calling" ? "none" : "block" }}
        />
        <video
          className={classes.localVideo}
          id="user-local-video"
          style={{ display: props.callType === "calling" ? "none" : "block" }}
          autoPlay
        />
      </Spin>
    </div>
  );
}

Video.propTypes = {
  loading: PropTypes.bool,
  callType: PropTypes.string,
  display: PropTypes.string,
  zIndex: PropTypes.number,
  setCallType: PropTypes.func
};
