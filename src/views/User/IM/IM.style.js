import { createUseStyles } from "react-jss";

export default createUseStyles({
  cardWrapper: {
    // width: "100vw",
    // height: "100vh"
    position: "absolute",
    width: 400,
    height: 720,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  card: {
    width: "100%",
    height: "100%"
  },
  popover: {
    position: "relative",
    padding: 0
  },
  imIcon: {
    position: "fixed",
    bottom: 20,
    right: 20
  },
  im: {
    width: "100%",
    height: "100%",
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
      left: "-0.1%",
      width: "100%",
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
  },
  callButton: {
    position: "absolute",
    right: 120,
    bottom: 20
  },
  peerButton: {
    position: "absolute",
    right: 180,
    bottom: 20
  }
});
