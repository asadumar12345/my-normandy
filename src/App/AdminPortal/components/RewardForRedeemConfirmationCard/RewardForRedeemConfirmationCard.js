import React, { useState } from "react";
import PropTypes from "prop-types";
import { Space, Image, Typography, Button, Card } from "antd";

import { colors } from "../../utils/colors";
import '../../../../App.css';

import rightArrow from "./images/rightArrow.svg";
import downArrow from "./images/downArrow.svg";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { styles } from "./style";

const { Text } = Typography;

const RewardForRedeemConfirmationCard = ({
  imgSource,
  title,
  onCancel,
  onAccept,
  name,
  status,
  requestDate,
  productName,
  lastActivityDate,
  email,
  availablePoints,
  radeemedPoints,
  setModalOpen
}) => {
  const [changeIcon, setChangeIcon] = useState(false);
  let dumyArry = [
    {
      titleLeft: "Agent Name:",
      leftValue: name,
      titleRight: "Approval Status",
      RightValue: status,
      showStatus: true,
    },
    {
      titleLeft: "Last Salesforce Activity",
      leftValue: lastActivityDate,
      titleRight: "Request DATE",
      RightValue: requestDate,
    },
    {
      titleLeft: "Product",
      leftValue: productName,
      titleRight: "",
      RightValue: '',
    },
    {
      titleLeft: "Email",
      leftValue: email,
      titleRight: "Request DATE",
      RightValue: requestDate,
    },
    {
      titleLeft: "Available Points",
      leftValue: availablePoints,
      titleRight: "Redeemed Points",
      RightValue: radeemedPoints,
    }
  ]
  const detailBtnHandler = () => {
    setChangeIcon(!changeIcon);
    
    
  };

  return (
    <div className="hoverCard"  style={styles.outerContainer}>
      <div style={styles.smallCardContainer}>
        <Space direction="horizontal" size={16}>
          <Image
            style={{
              borderRadius: 4,
              border: `1px solid ${colors.grayNeutral300}`,
            }}
            preview={false}
            src={imgSource}
            alt="normandy"
            width={64}
            height={64}
          />
          <Space direction="vertical" size={0}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Space direction="horizontal" size={6}>
              <Button
                style={styles.detailBtn}
                onClick={detailBtnHandler}
                type="link"
              >
                View Detail
              </Button>

              <Image
                style={{ marginBottom: 3 }}
                preview={false}
                src={changeIcon ? downArrow : rightArrow}
                alt="icon"
              />
            </Space>
          </Space>
        </Space>
        <Space direction="horizontal" size={12}>
          <div
            onClick={()=>onCancel(true)}
            style={{cursor : 'pointer'}}
          >
            <  CloseOutlined style={styles.approvalBtnContainer} />
          </div>
          <div
            onClick={onAccept}
            style={{cursor : 'pointer'}}
          >
            <CheckOutlined style={{
              ...styles.approvalBtnContainer,
              background: colors.green200,
            }} />
          </div>
        </Space>
      </div>
      {/* card details */}
      { changeIcon && (
        <div style={styles.detailsContainer}>
          <div style={{padding : 24}}> 
            {dumyArry.map((item, i) => (
            <div
              key={item.titleLeft}
              style={
                i === 0
                  ? styles.detailItemContainer
                  : { ...styles.detailItemContainer, marginTop: 20 }
              }
            >
              <Space direction="vertical" size={6}>
                <Text style={styles.title}>{item.titleLeft}</Text>
                <Text style={styles.text}>{item.leftValue}</Text>
              </Space>
              <Space direction="vertical" size={6}>
                <Text style={styles.title}>{item.titleRight}</Text>
                {item.showStatus ? (
                  <Space
                    style={{
                      float: "right",
                      backgroundColor: colors.orange500,
                      borderRadius: 10,
                      padding: "2px 8px 2px 6px",
                    }}
                    direction="horizontal"
                    size={4}
                  >
                    <div
                      style={{
                        borderRadius: 100,
                        width: 8,
                        height: 8,
                        backgroundColor: colors.brown,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 400,
                        color: colors.grey900,
                      }}
                    >
                      {item.RightValue}
                    </Text>
                  </Space>
                ) : (
                  <Space
                    style={{
                      float: "right",
                    }}
                    direction="horizontal"
                    size={4}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 400,
                        color: colors.grey900,
                      }}
                    >
                      {item.RightValue}
                    </Text>
                  </Space>
                )}
              </Space>
            </div>
          ))}
          </div>
        </div>
      )}
    </div>
  );
};

RewardForRedeemConfirmationCard.propTypes = {
  imgSource: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  requestDate: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  lastActivityDate: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  availablePoints: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  radeemedPoints: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};

export default RewardForRedeemConfirmationCard;
