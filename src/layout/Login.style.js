import { createUseStyles } from "react-jss";
import BG from "../assets/bg.png";

export default createUseStyles({
  rowWrapper: {
    display: "flex",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    // justifyContent: "center",
    // flexDirection: "column",
    backgroundImage: `url(${BG})`,
    backgroundColor: `rgba(16, 27, 42, 1)`,
    backgroundSize: "cover"
  },
  card: {
    height: 300
  },
  loginFormButton: {
    width: "100%"
  },
  iconColor: {
    color: "rgba(0,0,0,.25)"
  },
  root: {}
});
