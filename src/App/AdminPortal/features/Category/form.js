import { Button, Form, Input, Space, Spin, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useForceUpdate from "../../hooks/useForceUpdate";
import useLoading from "../../hooks/useLoading";
import { colors } from "../../utils/colors";
import { BASE_URL } from "../../utils/constants";
import { GET_CATEGORY_BY_ID_API } from "./constants";
const { Title } = Typography;

const CategoryForm = ({
  id,
  form,
  handleSubmit,
  closeModal,
  listLoading,
  isEdit,
}) => {
  const forceUpdate = useForceUpdate();
  const [fetchCategory, loading] = useLoading(async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}${GET_CATEGORY_BY_ID_API}?Id=${id}`
      );
      form.setFieldsValue({
        ARLC_Title: response.data.result.ARLC_Title,
      });
      forceUpdate();
    } catch (e) {
      console.log(e);
    }
  });

  useEffect(() => {
    if (id !== "create") {
      console.log("runing");
      fetchCategory();
    }
  }, [isEdit]);

  return (
    <div style={{ padding: 30 }}>
      <Title level={3} style={{ color: colors.black }}>
        {id === "create" ? "Add New Category" : "Edit Category"}
      </Title>
      <Spin spinning={listLoading || loading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Category Name"
            name="ARLC_Title"
            rules={[
              {
                required: true,
                message: "Please enter a category name",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Space direction="horizental" gap={2}>
              <Button
                onClick={() => {
                  closeModal();
                  form.resetFields();
                }}
                htmlType="button"
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {id === "create" ? "Send" : "Add"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default CategoryForm;
