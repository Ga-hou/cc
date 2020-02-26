import React from "react";
import { Comment, Tooltip, Avatar } from "antd";
import dayjs from "dayjs";
import useStyles from "./ChatMessage.style";
export default function ChatMessageList() {
  const classes = useStyles();
  return (
    <div className={classes.chatMessageList}>
      <Comment
        author={<a>Han Solo</a>}
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={
          <p>
            We supply a series of design principles, practical patterns and high
            quality design resources (Sketch and Axure), to help people create
            their product prototypes beautifully and efficiently.
          </p>
        }
        datetime={
          <Tooltip title={dayjs().format("YYYY-MM-DD HH:mm:ss")}>
            <span>{dayjs().format("YYYY-MM-DD HH:mm:ss")}</span>
          </Tooltip>
        }
      />
      <Comment
        style={{
          flexDirection: "row-reverse"
        }}
        className={classes.ownMessage}
        author={<a>Han Solo</a>}
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={
          <p
            style={{
              textAlign: "right"
            }}
          >
            We supply a series of design principles, practical patterns and high
            quality design resources (Sketch and Axure), to help people create
            their product prototypes beautifully and efficiently.
          </p>
        }
        datetime={
          <Tooltip title={dayjs().format("YYYY-MM-DD HH:mm:ss")}>
            <span>{dayjs().format("YYYY-MM-DD HH:mm:ss")}</span>
          </Tooltip>
        }
      />
    </div>
  );
}
