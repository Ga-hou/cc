import React from "react";
import { Card, Button } from "antd";
import { useHistory } from "react-router-dom";
import BaseLayout from "../components/BaseLayout/BaseLayout";
import TopBar from "../components/TopBar/TopBar";
import useStyles from "./Online.style";
export default function Online() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <BaseLayout>
      <TopBar />
      <Card className={classes.online}>
        <Button
          type="primary"
          className={classes.button}
          onClick={() => history.push("/user")}
        >
          上线
        </Button>
        <Button
          className={classes.button}
          onClick={() => history.push("/admin")}
        >
          管理端
        </Button>
      </Card>
    </BaseLayout>
  );
}
