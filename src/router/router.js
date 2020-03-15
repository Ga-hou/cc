import User from "../views/Admin/User/User";
import Dashboard from "../views/Admin/Dashboard/Dashboard";
import UserGroupRouter from "../views/Admin/UserGroup/UserGroupRouter";

export const routes = [
  {
    layout: "/admin",
    path: "/dashboard",
    name: "数据概览",
    component: Dashboard
  },
  {
    layout: "/admin",
    path: "/user",
    name: "客服管理",
    component: User
  },
  {
    layout: "/admin",
    path: "/user-group",
    name: "客服组管理",
    component: UserGroupRouter
  }
];
