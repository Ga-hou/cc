import { createUseStyles } from "react-jss";

export default createUseStyles({
  chatInput: {
    position: "relative",
    height: 200,
    borderTop: "1px solid #e8e8e8",
    padding: 20,
    "&:focus": {
      outline: "none"
    }
  },
  sendButton: {
    position: "absolute",
    right: 20,
    bottom: 20
  }
});
