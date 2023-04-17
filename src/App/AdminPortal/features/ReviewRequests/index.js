import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useDebouncedCallback } from "use-debounce";
import {
  Space,
  Typography,
  Button,
  Drawer,
  Image,
  Input,
  Select,
  Row,
  Col,
  Modal,
  Form,
  Card,
} from "antd";
import {
  FilterOutlined,
  SearchOutlined,
  DownOutlined,
  CloseOutlined,
  CheckOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";

import { colors } from "../../utils/colors";
import TableComponent from "../../components/Table/TableComponent";
import {
  generateSearchParamsGetter,
  getNewSearchParamStringWithArgs,
  getSearchParams,
} from "../../utils/helpers";
import AdminAppLayout from "../../Layouts/AdminLayout";
import RewardForRedeemConfirmationCard from "../../components/RewardForRedeemConfirmationCard/RewardForRedeemConfirmationCard";
import { BASE_URL } from "../../utils/constants";

import "./style.css";
import { getColumns } from "./columns";
import CancelReasonForm from "./form";
import { FILTER_DATA_API } from "./constants";

const { Text } = Typography;

const ReviewRequests = () => {
  let [spObj, setSearchParams] = useSearchParams();
  const [id, page, pageSize, filterName] = getSearchParams(spObj);

  const getNewSearchParamString = generateSearchParamsGetter(spObj);

  const mutateSearchParams = () => setSearchParams(getNewSearchParamString());

  const debounceFetcher = useDebouncedCallback((search) => {
    setSearchParams(
      getNewSearchParamStringWithArgs({ page: 1, pageSize, search })
    );
  }, 600);

  const [form] = Form.useForm();

  let url = BASE_URL + FILTER_DATA_API + getNewSearchParamString();
  const {
    data: agents,
    isValidating: loading,
    mutate,
  } = useSWR({
    url: url,
  });

  useEffect(() => {
    if (mutate) mutate();
  }, [filterName, pageSize, page, mutate]);

  const handleSubmit = (values) => {
    console.log(values);
  };

  const onPaginationChange = async (page, pageSize) => {
    setSearchParams(
      getNewSearchParamStringWithArgs({ page, pageSize, filterName })
    );
  };

  const handleSearch = (e) => {
    debounceFetcher(e.target.value);
  };

  const [data, setData] = useState();

  useEffect(() => {
    if (agents) {
      setData(agents);
    }
  }, [agents]);

  const [open, setOpen] = useState(false);

  const DrawerHeader = () => {
    return (
      <div style={{ borderBottom: `1px solid #E2E8F0`, paddingBottom: 20 }}>
        <Space>
          <Image
            width={40}
            height={40}
            preview={false}
            src="https://www.zelda.com/links-awakening/assets/img/home/hero-char.png"
          />
          <div style={{ marginLeft: 16 }}>
            <p style={{ fontSize: 14, fontWeight: 500, color: colors.black }}>
              Jane Cooper
            </p>
            <p style={{ fontSize: 14, fontWeight: 400 }}>
              jane.cooper@example.com
            </p>
          </div>
        </Space>
      </div>
    );
  };
  const DrawerFooter = () => {
    return (
      <div style={{ marginBottom: 28, marginTop: 28 }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Button style={{ height: 40 }} type="primary" block>
            Accept All Request
          </Button>
          <Button style={{ height: 40 }} block>
            Cancel Request
          </Button>
        </Space>
      </div>
    );
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const columns = getColumns({ showDrawer });
  const onClose = () => {
    setOpen(false);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const cardData = [
    {
      imgSource: "https://picsum.photos/200/300",
      email: "john.doe@example.com",
      name: "John Doe",
      title: "Software Engineer",
      requestDate: "Mar 31, 2022",
      productName: "Product A",
      lastActivityDate: "Apr 1, 2022",
      availablePoints: 2500,
      redeemedPoints: 500,
      status: "pending",
      onCancel: setModalOpen,
    },
    {
      imgSource: "https://picsum.photos/400/600",
      email: "jane.doe@example.com",
      name: "Jane Doe",
      title: "Project Manager",
      requestDate: "Mar 31, 2022",
      productName: "Product B",
      lastActivityDate: "Apr 1, 2022",
      availablePoints: 5000,
      redeemedPoints: 1500,
      status: "pending",
      onCancel: setModalOpen,
    },
    {
      imgSource: "https://picsum.photos/800/1200",
      email: "alex.smith@example.com",
      name: "Alex Smith",
      title: "UX Designer",
      requestDate: "Mar 31, 2022",
      productName: "Product C",
      lastActivityDate: "Apr 1, 2022",
      availablePoints: 7500,
      redeemedPoints: 2500,
      status: "pending",
      onCancel: setModalOpen,
    },
    {
      imgSource: "https://picsum.photos/1200/1800",
      email: "mary.jones@example.com",
      name: "Mary Jones",
      title: "Marketing Specialist",
      requestDate: "Mar 31, 2022",
      productName: "Product D",
      lastActivityDate: "Apr 1, 2022",
      availablePoints: 10000,
      redeemedPoints: 5000,
      status: "pending",
      onCancel: setModalOpen,
    },
    {
      imgSource: "https://picsum.photos/1600/2400",
      email: "david.nguyen@example.com",
      name: "David Nguyen",
      title: "Data Scientist",
      requestDate: "Mar 31, 2022",
      productName: "Product E",
      lastActivityDate: "Apr 1, 2022",
      availablePoints: 12500,
      redeemedPoints: 7500,
      status: "pending",
      onCancel: setModalOpen,
    },
  ];
  const StatusHandler = (event) => {
    if (event === "all") {
      setData(data?.result);
      return;
    }
    const result = data?.result.filter((item) => item.approvalStatus === event);
    setData(result);
  };
  return (
    <AdminAppLayout>
      <div
        style={{
          paddingLeft: 60,
          paddingRight: 60,
          marginTop: 56,
          marginBottom: 40,
        }}
      >
        <Row
          style={{ marginTop: 50, marginBottom: 28 }}
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        >
          <Col
            className="gutter-row"
            span={8}
            style={{ display: "flex", alignItems: "end" }}
          >
            <div>
              <Input
                addonAfter={
                  <>
                    <FilterOutlined
                      style={{
                        color: "rgba(0,0,0,.45)",
                        marginRight: 10,
                      }}
                    />
                    <Text>Filters</Text>
                  </>
                }
                size="large"
                placeholder="Search Rewards..."
                defaultValue={filterName}
                onChange={handleSearch}
                allowClear
                prefix={
                  <SearchOutlined
                    style={{
                      color: "rgba(0,0,0,.45)",
                    }}
                  />
                }
              />
            </div>
          </Col>
          <Col
            style={{ display: "flex", alignItems: "end" }}
            className="gutter-row"
            span={8}
          >
            <div>
              <Select
                defaultValue="lucy"
                size="large"
                style={{ width: 200 }}
                onChange={StatusHandler}
                options={[
                  { value: "all", label: "All" },
                  { value: "pending", label: "Pending" },
                  { value: "confirmed", label: "confirmed" },
                  { value: "cancelled", label: "Cancelled" },
                ]}
              />
            </div>
          </Col>

          {/* Status card */}
          <Col span={8}>
            <div
              style={{
                width: "80%",
                background: colors.bgGrey,
                textAlign: "center",
                padding: 10,
              }}
            >
              <p style={{ fontSize: 11 }}>
                Total Agent Requests:{" "}
                <span style={{ fontWeight: 500, color: colors.black }}>8</span>
              </p>
            </div>
            <Card
              style={{
                width: "80%",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              }}
            >
              <Space
                style={{
                  display: "flex",
                  verticalAlign: "middle",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  width: "100%",
                }}
              >
                <div
                  onClick={() => {}}
                  style={{ cursor: "pointer", textAlign: "center" }}
                >
                  <CheckOutlined
                    style={{
                      padding: 8,
                      background: colors.green200,
                      borderRadius: 500,
                    }}
                  />
                  <p style={{ fontSize: 11, marginTop: 3 }}>
                    <span style={{ fontWeight: 400, color: colors.black }}>
                      5{" "}
                    </span>
                    Confirmed
                  </p>
                </div>
                <div
                  onClick={() => {}}
                  style={{ cursor: "pointer", textAlign: "center" }}
                >
                  <ClockCircleOutlined
                    style={{
                      background: colors.orange500,
                      padding: 8,
                      borderRadius: 500,
                    }}
                  />
                  <p style={{ fontSize: 11, marginTop: 3 }}>
                    <span style={{ fontWeight: 400, color: colors.black }}>
                      2{" "}
                    </span>
                    Pending
                  </p>
                </div>

                <div
                  onClick={() => {}}
                  style={{ cursor: "pointer", textAlign: "center" }}
                >
                  <CloseOutlined
                    style={{
                      background: colors.red300,
                      padding: 8,
                      borderRadius: 500,
                    }}
                  />
                  <p style={{ fontSize: 11, marginTop: 3 }}>
                    <span style={{ fontWeight: 400, color: colors.black }}>
                      2{" "}
                    </span>
                    Cancelled
                  </p>
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
        {/* Table component */}
        <div>
          <TableComponent
            loading={loading}
            data={data?.result}
            columns={columns}
            border
            pagination={{
              totalPage: data?.totalPages * pageSize,
              pageSize: pageSize,
            }}
            handleServerPagination={onPaginationChange}
            isServerPagination // true for serverSide pagination
          />
        </div>

        {/* Side drawer */}
        <Drawer
          footerStyle={{ paddingLeft: 24, paddingRight: 24 }}
          bodyStyle={{ paddingLeft: 24, paddingRight: 24, paddingTop: 0 }}
          style={{ background: colors.bgGrey, zIndex: 0 }}
          footer={<DrawerFooter />}
          mask={false}
          width={546}
          headerStyle={{ borderBottom: "none", marginTop: 16 }}
          rootClassName={"drawer"}
          placement="right"
          title={<DrawerHeader />}
          onClose={onClose}
          open={open}
        >
          <Text
            style={{
              color: colors.black,
              fontSize: 14,
              fontWeight: 500,
              marginTop: 28,
              marginBottom: 8,
            }}
          >
            Rewards for Redeem:
          </Text>
          {cardData.map((CardData, index) => (
            <RewardForRedeemConfirmationCard
              onCancel={CardData.onCancel}
              radeemedPoints={CardData.redeemedPoints}
              availablePoints={CardData.availablePoints}
              email={CardData.email}
              lastActivityDate={CardData.lastActivityDate}
              productName={CardData.productName}
              requestDate={CardData.requestDate}
              key={index}
              title={CardData.title}
              imgSource={CardData.imgSource}
              name={CardData.name}
              status={CardData.status}
            />
          ))}
        </Drawer>
        {/* Cancel request modal */}
        <Modal
          title={null}
          centered
          closable={true}
          width={766}
          footer={null}
          open={modalOpen}
          onOk={() => setModalOpen(false)}
          onCancel={() => setModalOpen(false)}
          bodyStyle={{}}
        >
          <CancelReasonForm
            form={form}
            handleSubmit={handleSubmit}
            setModalOpen={setModalOpen}
          />
        </Modal>
      </div>
    </AdminAppLayout>
  );
};
export default ReviewRequests;
