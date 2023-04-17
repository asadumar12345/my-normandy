import React from "react";
import { Button, Tag, Image, Space } from "antd";

import { colors } from "../../utils/colors";

export const getColumns = ({ showDrawer }) => [
  {
    title: "AGENT NAME",
    key: "1",
    width: "28%",
    render: (_, object) => (
      <Space>
        <Image
          style={{ borderRadius: "100%" }}
          width={40}
          height={40}
          preview={false}
          alt="icon"
          src={
            object?.tbl_ACAG_Agents?.ACAG_Image_Path ||
            "https://img.freepik.com/free-icon/user_318-159711.jpg"
          }
        />
        <div style={{ marginLeft: 10 }} direction="vertical">
          <p
            style={{
              padding: 0,
              margin: 0,
              fontSize: 14,
              fontWeight: 500,
              color: colors.black,
            }}
          >
            {object?.tbl_ACAG_Agents?.ACAG_Name}
          </p>
          <p
            style={{
              padding: 0,
              margin: 0,
              fontSize: 14,
              fontWeight: 400,
              color: colors.gry1000,
            }}
          >
            {object?.tbl_ACAG_Agents?.ACAG_Email}
          </p>
        </div>
      </Space>
    ),
  },
  {
    title: "REWARD",
    key: "2",
    dataIndex: "reward",
    width: "14%",
  },
  {
    title: "REDEEM",
    key: "3",
    dataIndex: "redeem",
    width: "14%",
  },
  {
    title: "QUANTITY",
    key: "4",
    dataIndex: "ARAG_Quantity",
    width: "11%",
  },
  {
    title: "ORDER STATUS",
    key: "5",
    dataIndex: "orderStatus",
    width: "15%",
    align: "center",
  },
  {
    title: "APPROVEL STATUS",
    key: "6",
    dataIndex: "approvalStatus",
    width: "14%",
    align: "center",
    render: (_, object) => (
      <Tag
        style={{
          border: "none",
          width: 66,
          textAlign: "center",
          borderRadius: 10,
          color: colors.grey900,
          backgroundColor:
            object.approvalStatus === "pending"
              ? colors.orange500
              : object.approvalStatus === "confirmed"
              ? colors.green500
              : object.approvalStatus === "cancelled"
              ? colors.red300
              : "",
        }}
      >
        {object.approvalStatus}
      </Tag>
    ),
  },
  {
    key: "7",
    width: "4%",
    align: "center",
    render: (_, object) => (
      <Button type="link" onClick={showDrawer}>
        view detail
      </Button>
    ),
  },
];
