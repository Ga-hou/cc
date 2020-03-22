import React, { useMemo } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Menu, Avatar, Layout } from "antd";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./Aside.style";
import { setCurrentRoom } from "../../../store/socket/action";
export default function Aside() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { rooms } = useSelector(e => e.socket);

  const today = useMemo(() => {
    return dayjs().startOf("day");
  }, []);

  const setChatRoom = room => {
    dispatch(setCurrentRoom(room));
  };

  return (
    <Layout.Sider width={260}>
      <Menu className={classes.menu}>
        {rooms?.map((room, key) => {
          return (
            <Menu.Item
              key={key}
              className={classes.menuItem}
              onClick={() => setChatRoom(room)}
            >
              <Avatar
                size={"large"}
                shape={"square"}
                icon={<UserOutlined className={classes.userIcon} />}
              />
              <span>
                {room.modifyDate &&
                  (dayjs(room.modifyDate).isAfter(today)
                    ? dayjs(room.modifyDate).format("YYYY-MM-DD HH:mm:ss")
                    : dayjs(room.modifyDate).format("hh:mm:ss"))}
              </span>
            </Menu.Item>
          );
        })}
      </Menu>
    </Layout.Sider>
  );
}
