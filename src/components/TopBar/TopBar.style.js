import { createUseStyles } from "react-jss";

export default createUseStyles({
  TopBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    background: "rgba(0, 0, 0, .75)"
  },
  userInfo: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#fff",
    textAlign: "left"
  },
  userName: {
    width: "100%",
    height: "40%",
    padding: "0 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  userId: {
    padding: "0 10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start"
  }
});
