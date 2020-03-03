import React, { useState, useEffect, useMemo } from "react";
import { Menu, Avatar, Layout, Spin } from "antd";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./Aside.style";
import { services } from "../../../services";
import { setSocketRoom, setCurrentRoom } from "../../../store/socket/action";

export default function Aside() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { rooms } = useSelector(e => e.socket);
  const [loading, setLoading] = useState(true);

  const today = useMemo(() => {
    return dayjs().startOf("day");
  }, []);

  const setChatRoom = room => {
    dispatch(setCurrentRoom(room));
  };

  useEffect(() => {
    setLoading(true);
    services("room/list")
      .then(res => {
        dispatch(setSocketRoom(res.data.rooms));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Layout.Sider width={260}>
      <Menu className={classes.menu}>
        {loading ? (
          <Menu.Item>
            <Spin size="large" className={classes.loading} />
          </Menu.Item>
        ) : (
          rooms &&
          rooms.map((room, key) => {
            return (
              <Menu.Item
                key={key}
                className={classes.menuItem}
                onClick={() => setChatRoom(room)}
              >
                <Avatar icon="user" size={30} />
                <span>
                  {room.modifyDate &&
                    (dayjs(room.modifyDate).isAfter(today)
                      ? dayjs(room.modifyDate).format("YYYY-MM-DD HH:mm:ss")
                      : dayjs(room.modifyDate).format("hh:mm:ss"))}
                </span>
              </Menu.Item>
            );
          })
        )}
      </Menu>
    </Layout.Sider>
  );
}
