import React from "react";
import { Layout } from "antd";
import useStyles from "./BaseLayout.style";
export default function BaseLayout(props) {
  const classes = useStyles();
  return <Layout className={classes.Layout}>{props.children}</Layout>;
}
