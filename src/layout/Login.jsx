import React from "react";
import { useDispatch } from "react-redux";
import useStyles from "./Login.style";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form } from "antd";
import { Row, Col, Card, Input, Button, message } from "antd";
import { services } from "../services";
import { useHistory } from "react-router-dom";
import { authUserInfo } from "../store/userInfo/action";

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const requestLogin = values => {
    services("/auth/login", values)
      .then(res => {
        dispatch(
          authUserInfo({
            token: res.data.token
          })
        );
        history.push("/online");
      })
      .catch(e => {
        message.error(e.error);
      });
  };

  return (
    <Row className={classes.rowWrapper}>
      <Col offset={8} span={8}>
        <Card className={classes.card}>
          <Form onFinish={requestLogin} className="login-form">
            <Form.Item
              name={"account"}
              rules={[{ required: true, message: "请输入用户名!" }]}
            >
              <Input
                size="large"
                prefix={<UserOutlined className={classes.iconColor} />}
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item
              name={"password"}
              rules={[{ required: true, message: "请输入密码!" }]}
            >
              <Input
                size="large"
                prefix={<LockOutlined className={classes.iconColor} />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className={classes.loginFormButton}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;
