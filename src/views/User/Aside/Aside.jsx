import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Menu, Avatar, Layout, Button } from "antd";
import { debounce } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./Aside.style";
import { setCurrentRoom, updateSocketRoom } from "../../../store/socket/action";
import AgentSocket from "../../../utils/AgentSocket";
import avatar from "../../../assets/tim.png";
export default function Aside() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { rooms } = useSelector(e => e.socket);
  const [answerLoading, setAnswerLoading] = useState(false);

  const setChatRoom = room => {
    dispatch(setCurrentRoom(room));
  };

  const joinChatRoom = room => {
    setAnswerLoading(true);
    AgentSocket.join(room.roomId)
      .then(roomName => {
        setAnswerLoading(false);
        dispatch(
          updateSocketRoom({
            roomName,
            data: {
              type: "chat"
            }
          })
        );
        setChatRoom(room);
      })
      .catch(() => {
        setAnswerLoading(false);
      });
  };

  return (
    <Layout.Sider width={260}>
      <Menu className={classes.menu}>
        {rooms?.map((room, key) => {
          return (
            <Menu.Item
              key={key}
              className={classes.menuItem}
              onClick={() => {
                if (room.type === "call") return;
                setChatRoom(room);
              }}
            >
              <Avatar
                size={"large"}
                shape={"circle"}
                src={avatar}
                // icon={<UserOutlined className={classes.userIcon} />}
              />
              {room.type === "call" && (
                <Button
                  type={"primary"}
                  size={"large"}
                  shape={"circle"}
                  className={classes.answer}
                  loading={answerLoading}
                  onClick={() => joinChatRoom(room)}
                >
                  {!answerLoading && "接听"}
                </Button>
              )}
            </Menu.Item>
          );
        })}
      </Menu>
    </Layout.Sider>
  );
}
