import React from "react";
import { Comment, Avatar } from "antd";
import dayjs from "dayjs";
export default function ChatMessageList() {
  return (
    <Comment
      author={<a>Han Solo</a>}
      avatar={
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
      }
      content={
        <pre>
          We supply a series of design principles, practical patterns and high
          quality design resources (Sketch and Axure), to help people create
          their product prototypes beautifully and efficiently.
        </pre>
      }
      datetime={<span>{dayjs().format("YYYY-MM-DD HH:mm:ss")}</span>}
    />
  );
}
