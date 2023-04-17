import {
  Button,
  Col,
  Form,
  Input,
  Row,
  theme,
  Image,
  Space,
  Typography,
  message,
  Checkbox,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { colors } from "../../utils/colors";
import { BASE_URL, routes } from "../../utils/constants";
import { LOGIN_ADMIN_API } from "./constants";

import logoImg from "./images/logo.png";

const { Title } = Typography;

const Login = ({ auth, setAuth }) => {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const {
    token: { colorBgLoginLayout },
  } = theme.useToken();

  useEffect(() => {
    if (auth?.token) {
      navigate(`${routes.REWARDINVENTORY}?page=1&pageSize=10`);
    }
  }, []);

  const [loginForm] = Form.useForm();

  const loginUser = async (values) => {
    const userData = {
      Email: values.email,
      Password: values.password,
    };
    setLoading(true);
    let url = `${BASE_URL}${LOGIN_ADMIN_API}`;
    await axios
      .post(url, userData)
      .then((res) => {
        console.log('res in login',res);
        setAuth(res?.data);
        setLoading(false);
        message.success("User signed in successfully.");
        loginForm.resetFields();
        navigate(`${routes.REWARDINVENTORY}?page=1&pageSize=10`);
      })
      .catch((error) => {
        setLoading(false);
        message.error(`${error.message}`);
      });
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <Space direction="horizontal" size={141}>
      <div
        style={{ background: colorBgLoginLayout, width: 785, height: "100vh" }}
      >
        <Image
          style={{ marginLeft: "230px", marginTop: "284px" }}
          height={53}
          width={357}
          preview={false}
          src={logoImg}
        />
      </div>
      <Col style={{ width: 368 }} span={24}>
        <Col>
          <Title
            style={{ marginBottom: 44, marginTop: 0, color: colors.grey900 }}
          >
            Admin Login
          </Title>
        </Col>
        <Form form={loginForm} layout="vertical" onFinish={loginUser}>
          <Col span={24}>
            <Form.Item
              label="Email address"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input
                style={{
                  height: 42,
                  border: `1px solid ${colors.grayNeutral300}`,
                }}
                autoComplete="off"
                size="large"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password!",
                },
              ]}
            >
              <Input.Password
                style={{
                  height: 42,
                  border: `1px solid ${colors.grayNeutral300}`,
                }}
                size="large"
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Row>
            <Col span={12}>
              <Checkbox style={{ color: colors.grey500 }} onChange={onChange}>
                Remember me
              </Checkbox>
            </Col>
            <Col span={12}>
              <a
                href="/"
                style={{
                  float: "right",
                  color: colors.secondaryBlue,
                }}
              >
                Forgot password?
              </a>
            </Col>
          </Row>
          <Row style={{ marginTop: 28 }}>
            <Col span={24}>
              <Button
                loading={loading}
                block
                type="primary"
                htmlType="submit"
                size="large"
              >
                Sign-in
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Space>
  );
};

export default Login;
