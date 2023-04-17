import React  from "react";
import '../../../../App.css';
import { Button, Tag, Image, Popover } from "antd";
import editIcon from "./images/edit.svg";
import noteIcon from "./images/note.svg";
import { colors } from "../../utils/colors";

export const getColumns = ({ editDetail ,  popoverContent , Redirect  }) => [
  {
    title: "Agent Name",
    key: "1",
    dataIndex: "ACAG_Name",
    width: "12.5%" ,
    render : (_,object)=>(
      <Button type="link" onClick={()=>Redirect(object.ACAG_KeyID)}>{object.ACAG_Name}</Button>
    )
  },
  {
    title: "Agency Name",
    key: "2",
    dataIndex: "ACAG_Agency_Name",
    width: "12.5%",
  },
  {
    title: "Available Points",
    key: "3",
    dataIndex: "ACAG_Available_Points",
    width: "12.5%",
  },
  {
    title: "Redeemable Points",
    key: "4",
    dataIndex: "ACAG_Points_Redeemed",
    width: "12.5%",
  },
  {
    title: "Pending requests",
    key: "5",
    dataIndex: "PendingRequest",
    width: "12.5%",
  },
  {
    title: "Status",
    key: "6",
    dataIndex: "ACAG_Is_Active",
    width: "12.5%",
    render: (_, object) => (
      <Tag
        style={{
          border: "none",
          width: 66,
          textAlign: "center",
          borderRadius: 10,
          color: colors.grey900,
          backgroundColor:
            object.ACAG_Is_Active  ? colors.green500 : colors.red300,
        }}
      >
        {object.ACAG_Is_Active ? "Active" : 'Inactive'}
      </Tag>
    ),
  },
  {
    title: "notes",
    key: "7",
    dataIndex: "notes",
    width: "12.5%",
    render: (_, object) => (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Popover  placement="leftTop" title={<p style={{ fontSize: 14, fontWeight: 500, color: colors.black }}>Notes</p>} content={popoverContent} trigger="click">
          <Button type="link" >
            <Image src={noteIcon}  alt="normandy" preview={false} />
          </Button>
        </Popover>
      </div>
    ),
  },
  {
    title: "Edit",
    key: "8",
    dataIndex: "edit",
    width: "12.5%",
    render: (_, object) => (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type="link">
          <Image src={editIcon} onClick={() => { editDetail(object.ACAG_KeyID) }} alt="normandy" preview={false} />
        </Button>
      </div>
    ),
  }
];
