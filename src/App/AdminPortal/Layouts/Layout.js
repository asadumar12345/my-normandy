import React from "react";
import { Button, Layout, theme, Image, Space } from "antd";
import {
  HeartOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";

import { colors } from "../utils/colors";

import navIcon from "../features/Login/images/logo.png";

import "./Layout.css";

const { Header, Content } = Layout;

const AppLayout = ({ children }) => {
  const navigate = useNavigate();
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  // Dropdown items while hover on Home Link

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          padding: [25, 45, 25, 45],
          background: colors.white,
          borderBottom: "1px solid #CFD9E0",
        }}
      >
        <div style={{ float: "left" }}>
          <Space direction="horizontal">
            <Button type="link" onClick={() => navigate("/dashboard")}>
              <Image height={21} width={144} preview={false} src={navIcon} />
            </Button>
          </Space>
        </div>

        <div style={{ float: "right" }}>
          <Space direction="horizontal" size={48}>
            {[
              {
                title: "My Favorites",
                icon: <HeartOutlined />,
                action: () => {
                  navigate("/dashboard");
                },
              },
              {
                title: "Amelia Reaper",
                icon: <UserOutlined />,
                action: () => {
                  navigate(`/`);
                },
              },
              {
                title: "Cart",
                icon: <ShoppingCartOutlined />,
                action: () => {
                  navigate("/");
                },
              },
            ].map((item) => (
              <Button
                onClick={item.action}
                key={item.title}
                type="link"
                className="f-s"
                icon={item.icon}
              >
                {item.title}
              </Button>
            ))}
          </Space>
        </div>
      </Header>
      <Content
        style={{
          backgroundColor: "white",
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};
export default AppLayout;
