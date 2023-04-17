import { Button, Col, Form, Input, Modal, Row, Space, Typography } from "antd";
import React from "react";
import { colors } from "../../../utils/colors";

const { Title } = Typography;

const AddCategoryModal = ({
  open,
  form,
  toggleModal,
  handleCategoryChange,
}) => {
  return (
    <Modal
      maskStyle={{ backgroundColor: "#F6F8FBCC" }}
      centered
      footer={null}
      open={open}
      onCancel={toggleModal}
    >
      <Form
        style={{ padding: 70 }}
        form={form}
        layout="vertical"
        onFinish={handleCategoryChange}
      >
        <Title level={4} style={{ color: colors.black }}>
          Add New Category
        </Title>
        <Row gutter={50}>
          <Col span={24}>
            <Form.Item
              label="Category Name"
              name="ARLC_Title"
              rules={[
                { required: true, message: "Please enter a category name" },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
        </Row>

        {/*  Modal footer */}
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 50,
          }}
        >
          {/* Helper div */}
          <div />
          <Space direction="horizontal" size={20}>
            <Button
              style={{ color: colors.black }}
              type="default"
              onClick={() => {
                form.resetFields();
                toggleModal();
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Space>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;
