import { createUseStyles } from "react-jss";

export default createUseStyles({
  chatMessageList: {
    flex: 1,
    overflow: "scroll"
  },
  ownMessage: {
    flexDirection: "row-reverse",
    "& > .ant-comment-inner": {
      display: "flex",
      flexDirection: "row-reverse"
    },
    "& .ant-comment-content-author": {
      justifyContent: "flex-end"
    }
  },
  outContent: {
    textAlign: "right"
  },
  messageEnd: {
    float: "left",
    clear: "both"
  }
});
