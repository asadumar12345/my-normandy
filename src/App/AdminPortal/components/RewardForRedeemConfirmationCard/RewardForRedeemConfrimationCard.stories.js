import React from "react";
import RewardForRedeemConfirmationCard from "./RewardForRedeemConfirmationCard";

export default {
  component: RewardForRedeemConfirmationCard,
  title: "Components/RewardForRedeemConfirmationCard",
};

const Template = (args) => <RewardForRedeemConfirmationCard {...args} />;

export const Card = Template.bind({});
Card.args = {
  imgSource:
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  title: "Doordash Gift card",
  onCancel: () => {},
  onAccept: () => {},
  name: "Umer Khan",
  status: "Pending",
  requestDate: "3 Feb, 2023",
  productName: "Watch (abc)",
  lastActivityDate: "Yesterday 3:49 PM",
  email: "umer@email.com",
  availablePoints: 34000,
  radeemedPoints: 3000,
};
