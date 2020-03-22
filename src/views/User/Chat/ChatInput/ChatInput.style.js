import { createUseStyles } from "react-jss";

export default createUseStyles({
  chatInputWrapper: {
    position: "relative"
  },
  chatInput: {
    height: 200,
    borderTop: "1px solid #e8e8e8",
    padding: 20,
    overflow: "scroll",
    "&:focus": {
      outline: "none"
    }
  },
  sendButton: {
    float: "right",
    position: "absolute",
    right: 20,
    bottom: 20
  }
});
