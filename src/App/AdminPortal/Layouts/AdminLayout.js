import React, { useContext, useState } from "react";
import { Button, Layout, theme, Image, Space, Avatar, Popconfirm } from "antd";
import { useNavigate, useLocation } from "react-router";

import UserContext from "../context/UserContext";
import { colors } from "../utils/colors";

import "./Layout.css";

import navIcon from "../features/Login/images/logo.png";
import bellIcon from "./images/bell.svg";
import { routes } from "../utils/constants";

const { Header, Content } = Layout;

const AdminAppLayout = ({ children }) => {
  const location = useLocation();

  let activeStatus = 0;
  switch (location.pathname) {
    case "/reward-inventory":
      activeStatus = 0;
      break;
    case "/review-requests":
      activeStatus = 1;
      break;
    case "/manage-agent":
      activeStatus = 2;
      break;
    case (location.pathname.includes('/manage-agent/agent-profile')):
      activeStatus = 2;
      break;
    case "/category":
      activeStatus = 3;
      break;
      default : 
      const result = location.pathname.includes('/manage-agent/agent-profile')
      if(result){
        activeStatus = 2;
        break;
      }
      activeStatus = 0;
     
  }
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(UserContext);
  const [status, setStatus] = useState(activeStatus);

  const commonPaginationParams = "?page=1&pageSize=10";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          padding: 0,
          background: colors.white,
          borderBottom: "1px solid #CFD9E0",
        }}
      >
        <div style={{ float: "left" }}>
          <Space
            direction="horizontal"
            style={{
              paddingLeft: 32,
              paddingRight: 32,
            }}
          >
            <Button
              type="link"
              onClick={() => {
                navigate(`${routes.REWARDINVENTORY}${commonPaginationParams}`);
                setStatus(0);
              }}
            >
              <Image
                style={{ marginBottom: 10 }}
                height={26}
                width={176}
                preview={false}
                src={navIcon}
              />
            </Button>
          </Space>
        </div>
        <Space
          direction="horizontal"
          size={48}
          style={{ marginLeft: 24, float: "left" }}
        >
          {[
            {
              title: "Reward Inventory",
              onClick: () => {
                navigate(`${routes.REWARDINVENTORY}${commonPaginationParams}`);
              },
            },
            {
              title: "Review Requests",
              onClick: () => {
                navigate(`${routes.REVIEWREQUESTS}${commonPaginationParams}`);
              },
            },
            {
              title: "Manage Agent",
              onClick: () => {
                navigate(`${routes.MANAGEAGENT}${commonPaginationParams}`);
              },
            },
            {
              title: "Category",
              onClick: () => {
                navigate(`${routes.CATEGORY}${commonPaginationParams}`);
              },
            },
          ].map((item, index) => (
            <div className={status === index ? "border-botm" : ""}>
              <Button
                className={status === index ? "active" : "inactive"}
                onClick={() => item.onClick()}
                key={item.title}
                type="link"
                style={{
                  fontSize: 14,
                  fontWight: 500,
                }}
              >
                {item.title}
              </Button>
            </div>
          ))}
        </Space>

        <div style={{ float: "right" }}>
          <Space
            direction="horizontal"
            style={{
              paddingRight: 32,
            }}
          >
            {(status === 0 && location.pathname === '/reward-inventory') &&(
              <Button
                onClick={() => navigate(`${routes.REWARDINVENTORY}/create`)}
                style={{ marginRight: 20 }}
                type="primary"
              >
                + Add new reward
              </Button>
            )}

            <Image
              style={{ paddingRight: 20 }}
              preview={false}
              src={bellIcon}
              alt="icon"
            />
            <Popconfirm
              title="Logout"
              description="Are you sure to logout?"
              onConfirm={() => setAuth({})}
              okText="Yes"
              cancelText="No"
            >
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                style={{
                  backgroundColor: colors.purple500,
                  verticalAlign: "middle",
                  cursor: "pointer",
                }}
                size="large"
              />
            </Popconfirm>
          </Space>
        </div>
      </Header>
      <Content
        style={{
          backgroundColor: "#FFFFFF",
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default AdminAppLayout;
