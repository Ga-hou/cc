import React from "react";
import { Layout, Menu } from "antd";
import { useHistory } from "react-router-dom";
import useStyles from "./Sidebar.style";

const { SubMenu } = Menu;
const { Sider } = Layout;

export default function Sidebar(props) {
  const classes = useStyles();
  const history = useHistory();
  const [activeRouter, setActiveRouter] = React.useState();
  React.useEffect(() => {
    props.routes.forEach(e => {
      const path = e.layout + e.path;
      if (window.location.href.indexOf(path) > 1) {
        setActiveRouter(e);
      }
    });
  }, [props.routes]);

  const links = (
    <Menu
      mode="vertical"
      selectedKeys={activeRouter ? [activeRouter.path] : []}
    >
      {props.routes.map(prop => {
        return prop.children ? (
          <SubMenu key={prop.name} title={prop.name}>
            {prop.children?.map(item => {
              return (
                <Menu.Item
                  key={prop.path}
                  onClick={() => {
                    history.push(prop.layout + prop.path);
                    setActiveRouter(prop);
                  }}
                >
                  {item.name}
                </Menu.Item>
              );
            })}
          </SubMenu>
        ) : (
          <Menu.Item
            key={prop.path}
            onClick={() => {
              history.push(prop.layout + prop.path);
              setActiveRouter(prop);
            }}
          >
            {prop.name}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <Sider width={260} theme={"light"} className={classes.sider}>
      {links}
    </Sider>
  );
}
