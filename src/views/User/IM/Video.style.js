import { createUseStyles } from "react-jss";

export default createUseStyles({
  videoWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 999,
    width: "100%",
    height: "100%",
    background: "#101B2A"
  },
  localVideo: {
    width: "100%",
    height: "50%"
  },
  remoteVideo: {
    width: "100%",
    height: "50%",
    "& > video": {
      width: "100%",
      height: "100%"
    }
  },
  endButton: {
    position: "absolute",
    top: "70%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 160,
    height: 160,
    fontSize: 22
  },
  answerButton: {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 160,
    height: 160,
    fontSize: 22
  },
  spin: {
    width: "100%",
    height: "100%",
    "& > .ant-spin-container": {
      width: "100%",
      height: "100%"
    }
  }
});
