import React from "react";
import { Router, Route, useHistory } from "react-router-dom";
import UserGroup from "./UserGroup";
import Group from "./Group";

export default function UserGroupRouter() {
  const history = useHistory();
  return (
    <Router history={history}>
      <Route exact path={"/admin/user-group"} component={UserGroup} />
      <Route exact path={"/admin/user-group/:groupId"} component={Group} />
    </Router>
  );
}
