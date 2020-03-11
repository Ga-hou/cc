import User from "../views/Admin/User/User";
import Dashboard from "../views/Admin/Dashboard/Dashboard";

export const routes = [
  {
    layout: "/admin",
    path: "/user",
    name: "客服管理",
    component: User
  },
  {
    layout: "/admin",
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard
  }
];
