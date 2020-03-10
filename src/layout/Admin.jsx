import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { routes } from "../router/router";
import { Layout } from "antd";
import BaseLayout from "../components/BaseLayout/BaseLayout";
import Sidebar from "../components/Sidebar/Sidebar";
import useStyles from "./Admin.style";
import TopBar from "../components/TopBar/TopBar";
const { Content } = Layout;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from={"/admin"} to={routes[0].layout + routes[0].path} />
  </Switch>
);

export default function Admin() {
  const classes = useStyles();
  return (
    <BaseLayout>
      <TopBar />
      <Layout>
        <Sidebar routes={routes} />
        <Layout className={classes.Main}>
          <Content className={classes.Content}>{switchRoutes}</Content>
        </Layout>
      </Layout>
    </BaseLayout>
  );
}
