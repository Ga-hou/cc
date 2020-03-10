import React from "react";
import { Layout } from "antd";
import BaseLayout from "../components/BaseLayout/BaseLayout";
import TopBar from "../components/TopBar/TopBar";
import Aside from "../views/User/Aside/Aside";
import WorkBench from "../views/User/WorkBench/WorkBench";
import Video from "../components/Video/Video";
export default function Agent() {
  return (
    <BaseLayout>
      <TopBar />
      <Layout>
        <Aside />
        <WorkBench />
        <Video />
      </Layout>
    </BaseLayout>
  );
}
