import React from "react";
import { Layout, Empty } from "antd";
import { useSelector } from "react-redux";
import useStyles from "./WorkBench.style";
import Chat from "../Chat/Chat";
import AgentSocket from "../../../utils/AgentSocket";
import IM from "../IM/IM";
const { Content } = Layout;
export default function WorkBench() {
  const classes = useStyles();
  const { currentRoom } = useSelector(e => e.socket);
  React.useEffect(() => {
    AgentSocket.open();
    return () => {
      AgentSocket.close();
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
        <IM />
        <div
          id="im-local-video-wrapper"
          style={{ width: 200, height: 300 }}
        ></div>
      </Content>
    </Layout>
  );
}
