import { createUseStyles } from "react-jss";

export default createUseStyles({
  popover: {
    padding: 0
  },
  imIcon: {
    position: "fixed",
    bottom: 20,
    right: 20
  },
  im: {
    width: 400,
    height: 600,
    display: "flex",
    flexDirection: "column"
  },
  messageWrapper: {
    flex: 1,
    overflow: "scroll"
  },
  imInputWrapper: {
    position: "relative",
    paddingTop: 16,
    "&:after": {
      display: "block",
      content: '""',
      position: "absolute",
      top: 0,
      left: -16,
      width: 432,
      height: 1,
      background: "#e8e8e8"
    }
  },
  imInput: {
    height: 200,
    overflow: "scroll",
    "&:focus": {
      outline: "none"
    }
  },
  sendButton: {
    position: "absolute",
    right: 20,
    bottom: 20
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
  }
});
