import { createUseStyles } from "react-jss";

export default createUseStyles({
  videoCard: {
    background: "#101B2A",
    position: "absolute",
    cursor: "move"
  },
  videoWrapper: {
    position: "relative",
    width: "100%",
    height: "100%"
  },
  localVideo: {
    position: "absolute",
    bottom: 10,
    left: 10,
    width: 160
  },
  remoteVideo: {
    position: "absolute",
    width: 400,
    height: "100%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    "& > video": {
      width: "100%",
      height: "100%"
    }
  },
  callingVideo: {
    position: "absolute",
    width: 400,
    height: "100%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: 20,
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10
  }
});
