import React from "react";
import { Layout, Empty } from "antd";
import useStyles from "./WorkBench.style";
import Chat from "../Chat/Chat";
const { Content } = Layout;
export default function WorkBench() {
  const classes = useStyles();
  const arr = [];
  return (
    <Layout>
      <Content>
        {arr.length !== 0 ? (
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
