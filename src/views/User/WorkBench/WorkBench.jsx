import React from "react";
import { Layout, Empty } from "antd";
import { useSelector } from "react-redux";
import useStyles from "./WorkBench.style";
import Chat from "../Chat/Chat";
import IM from "../../../utils/IM";
const { Content } = Layout;
export default function WorkBench() {
  const classes = useStyles();
  const { currentRoom } = useSelector(e => e.socket);
  React.useEffect(() => {
    IM.open();
    return () => {
      IM.close();
    };
  }, []);
  return (
    <Layout>
      <Content>
        {!currentRoom ? (
          <Empty
            className={classes.empty}
            description={<span>这里空空的</span>}
          />
        ) : (
          <Chat />
        )}
      </Content>
    </Layout>
  );
}
