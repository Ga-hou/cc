import { createUseStyles } from "react-jss";
export default createUseStyles({
  menu: {
    position: "relative",
    height: "calc(100vh - 64px)"
  },
  menuItem: {
    height: "60px !important",
    lineHeight: "60px !important"
  },
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
});
