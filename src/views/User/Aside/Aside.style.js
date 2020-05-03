import { createUseStyles } from "react-jss";
export default createUseStyles({
  layoutSider: {
    top: -64,
    position: "relative",
    height: "calc(100vh - 64px)"
  },
  menu: {
    position: "relative",
    height: "calc(100vh - 64px)"
  },
  menuItem: {
    height: "60px !important",
    lineHeight: "60px !important",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#eee"
  },
  answer: {
    fontSize: 14
  },
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  userIcon: {
    fontSize: "24px !important",
    marginRight: "0 !important"
  }
});
