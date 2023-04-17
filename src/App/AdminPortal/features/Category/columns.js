import React from "react";
import { Button, Image, Popconfirm } from "antd";

import editIcon from "./images/edit.svg";
import trashIcon from "./images/trash.svg";
import { formatDate } from "../../utils/helpers";

export const getColumns = ({ deleteCategory, openModal,setIsEdit }) => [
  {
    title: "CATEGORY",
    key: "1",
    dataIndex: "ARLC_Title",
    width: "52%",
  },

  {
    title: "REWARD ASSOCIATED",
    key: "2",
    dataIndex: "Reward_Quantity",
    width: "15%",
  },
  {
    title: "CREATED DATE",
    key: "3",
    render: (_, object) => <p>{formatDate(object.ARLC_zalt_altered_date)}</p>,
    width: "18%",
  },
  {
    title: "EDIT",
    key: "4",
    dataIndex: "edit",
    width: "15%",
    render: (_, object) => (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button type="link">
          <Image
            src={editIcon}
            onClick={() => {
              openModal(object.ARLC_KeyID);
              setIsEdit((prev) => !prev);

            }}
            alt="normandy"
            preview={false}
          />
        </Button>

        <Popconfirm
          title="Are You Sure?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => deleteCategory(object.ARLC_KeyID)}
        >
          <Button type="link">
            <Image src={trashIcon} alt="normandy" preview={false} />
          </Button>
        </Popconfirm>
      </div>
    ),
  },
];
