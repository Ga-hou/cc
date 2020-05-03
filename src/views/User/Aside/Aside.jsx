import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Menu, Avatar, Layout, Button } from "antd";
// import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./Aside.style";
import { setCurrentRoom, updateSocketRoom } from "../../../store/socket/action";
import AgentSocket from "../../../utils/AgentSocket";
export default function Aside() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { rooms } = useSelector(e => e.socket);

  // const today = useMemo(() => {
  //   return dayjs().startOf("day");
  // }, []);

  const setChatRoom = room => {
    dispatch(setCurrentRoom(room));
  };

  const joinChatRoom = (e, room) => {
    AgentSocket.join(room.roomId).then(roomName => {
      dispatch(
        updateSocketRoom({
          roomName,
          data: {
            type: "chat"
          }
        })
      );
      setChatRoom(room);
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
                shape={"square"}
                icon={<UserOutlined className={classes.userIcon} />}
              />
              {room.type === "call" && (
                <Button type={"primary"} onClick={e => joinChatRoom(e, room)}>
                  接听
                </Button>
              )}
            </Menu.Item>
          );
        })}
      </Menu>
    </Layout.Sider>
  );
}
