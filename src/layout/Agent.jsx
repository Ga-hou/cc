import React from "react";
import { Layout, Spin } from "antd";
import { useSelector } from "react-redux";
import BaseLayout from "../components/BaseLayout/BaseLayout";
import TopBar from "../components/TopBar/TopBar";
import Aside from "../views/User/Aside/Aside";
import WorkBench from "../views/User/WorkBench/WorkBench";
import Video from "../components/Video/Video";
export default function Agent() {
  const { loading } = useSelector(e => e.socket);
  return (
    <BaseLayout>
      <TopBar />
      <Spin size={"large"} spinning={loading}>
        <Layout>
          <Aside />
          <WorkBench />
          <Video />
        </Layout>
      </Spin>
    </BaseLayout>
  );
}
