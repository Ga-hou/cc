import React from "react";
import { Layout } from "antd";
import BaseLayout from "../components/BaseLayout/BaseLayout";
import TopBar from "../components/TopBar/TopBar";
import Aside from "../views/User/Aside/Aside";
import WorkBench from "../views/User/WorkBench/WorkBench";
import IM from "../utils/IM";
export default function Agent() {
  React.useEffect(() => {
    IM.open();
    return () => {
      IM.close();
    };
  }, []);
  return (
    <BaseLayout>
      <TopBar />
      <Layout>
        <Aside />
        <WorkBench />
      </Layout>
    </BaseLayout>
  );
}
