import React from "react";
import { Button, Tag, Image ,Typography } from "antd";

import editIcon from "./images/edit.svg";
import { colors } from "../../utils/colors";
import { routes } from "../../utils/constants";

export const getColumns = ({navigate}) => [
  {
    title: "Rewards",
    key: "1",
    dataIndex: "ARLR_Title",
    width: "14%",
  },
  {
    title: "Category",
    key: "2",
    dataIndex: "tbl_ARLC_Categories.ARLC_Title",
    width: "14%",
    render : (_,object)=>(
     <Typography.Text>{object?.tbl_ARLC_Categories?.ARLC_Title}</Typography.Text>
    )
  },
  {
    title: "Quantity",
    key: "3",
    dataIndex: "ARLR_Quantity",
    width: "14%",
  },
  {
    title: "Redeemed on Points",
    key: "4",
    dataIndex: "ARLR_Norm_Points",
    width: "14%",
  },
  {
    title: "Approval Status",
    key: "5",
    dataIndex: "ARLR_Status",
    width: "14%",
    align: "center",
    render : (_,object) => (
      <p>{object.ARLR_Status === 1 ? 'Published' : object.ARLR_Status === 2 ? "Draft" : ''}</p>
    )
  },
  {
    title: "Status",
    key: "6",
    dataIndex: "ARLR_Is_Active",
    width: "16%",
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
            object.ARLR_Is_Active  ? colors.green500 : colors.red300,
        }}
      >
        { object.ARLR_Is_Active? 'Active' :'Inactive'}
      </Tag>
    ),
  },
  {
    title: "Edit",
    key: "7",
    fixed: "right",
    width: "14%",
    align: "center",
    render: (_, object) => (
      <Button type="link" onClick={()=>navigate(`${routes.REWARDINVENTORY}/${object.ARLR_KeyID}`)}>
        <Image src={editIcon} alt="normandy" preview={false} />
      </Button>
    ),
  },
];
