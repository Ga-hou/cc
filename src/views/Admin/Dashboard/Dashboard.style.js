import { createUseStyles } from "react-jss";
export default createUseStyles({
  chartCard: {
    position: "relative",
    height: 450,
    marginBottom: 20
  },
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  statistics: {
    position: "relative",
    height: 120
  }
});
