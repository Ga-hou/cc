import React from "react";
import { useDispatch } from "react-redux";
import useStyles from "./Login.style";
import { Row, Col, Card, Form, Icon, Input, Button, message } from "antd";
import { services } from "../services";
import { useHistory } from "react-router-dom";
import { authUserInfo } from "../store/userInfo/action";

const Login = props => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { getFieldDecorator, validateFields } = props.form;

  const requestLogin = () => {
    validateFields((error, values) => {
      if (!error) {
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
      }
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    requestLogin();
  };
  return (
    <Row className={classes.rowWrapper}>
      <Col offset={8} span={8}>
        <Card className={classes.card}>
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "请输入用户名!" }]
              })(
                <Input
                  size="large"
                  prefix={<Icon type="user" className={classes.iconColor} />}
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "请输入密码!" }]
              })(
                <Input
                  size="large"
                  prefix={<Icon type="lock" className={classes.iconColor} />}
                  type="password"
                  placeholder="密码"
                />
              )}
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
};

export default Form.create({ name: "" })(Login);
