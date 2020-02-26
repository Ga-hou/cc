import { createUseStyles } from "react-jss";

export default createUseStyles({
  online: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 460,
    height: 320,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "space-around"
  },
  buttonWrapper: {
    marginTop: 40
  },
  button: {
    width: 160,
    height: 50,
    margin: [0, 20]
  }
});
