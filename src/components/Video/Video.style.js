import { createUseStyles } from "react-jss";

export default createUseStyles({
  videoCard: {
    width: 600,
    height: 400,
    background: "#101B2A",
    position: "absolute",
    cursor: "move"
  },
  local: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 360,
    height: 360
  },
  video: {
    width: "100%",
    height: "100%"
  }
});
