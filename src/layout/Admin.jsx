import React from "react";
import { Switch, Route } from "react-router-dom";
import { routes } from "../router/router";
import { Layout } from "antd";
import BaseLayout from "../components/BaseLayout/BaseLayout";
import Sidebar from "../components/Sidebar/Sidebar";
import useStyles from "./Admin.style";
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
  </Switch>
);

export default function Admin() {
  const classes = useStyles();
  return (
    <BaseLayout>
      <Sidebar routes={routes} />
      <Layout className={classes.Main}>
        <Content className={classes.Content}>{switchRoutes}</Content>
      </Layout>
    </BaseLayout>
  );
}
