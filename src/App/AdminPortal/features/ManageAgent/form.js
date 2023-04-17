import { Button, Form, Input, Row, Col, Spin, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useForceUpdate from "../../hooks/useForceUpdate";
import useLoading from "../../hooks/useLoading";
import { colors } from "../../utils/colors";
import { BASE_URL } from "../../utils/constants";
import { GET_AGENT_BY_ID_API } from "./constants";
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
  const [fetchAgent, loading] = useLoading(async () => {
    console.log('api id' , id)
    try {
      const response = await axios.get(
        `${BASE_URL}${GET_AGENT_BY_ID_API}?KeyId=${id}`
      );
      // console.log('agent data', response)
      const data = response?.data?.result?.tbl_MSAD_Addresses
      form.setFieldsValue({
        MSAD_Address_Line1: data?.MSAD_Address_Line1,
        MSAD_Address_Line2: data?.MSAD_Address_Line2,
        MSAD_State : data?.MSAD_State,
        MSAD_ZipCode : data?.MSAD_ZipCode
      });
      forceUpdate();
    } catch (e) {
      console.log(e);
    }
  });

  useEffect(() => {
    // console.log('isss',id)
    if (id) {
      console.log("runing");
      fetchAgent();
    }
  }, [id]);

  return (
    <div>
      <Spin spinning={listLoading || loading}>
        <Form layout="vertical" form={form}
          onFinish={handleSubmit} style={{ padding: 30 }}>

          <Form.Item style={{ marginTop: 10 }} label="Street address 1"
           name="MSAD_Address_Line1"
           rules={[
             {
               required: false,
               message: "Please enter a category name",
             },
           ]}
          >
            <Input type="textarea" />
          </Form.Item>
          <Form.Item label="Street address 2"
           name="MSAD_Address_Line2"
           rules={[
             {
               required: false,
               message: "Please enter a category name",
             },
           ]}
          >
            <Input type="textarea" />
          </Form.Item>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12} className="gutter-row">
              <Form.Item label="City"
              name="City"
              rules={[
                {
                  required: false,
                  message: "Please enter a category name",
                },
              ]} >
                <Input type="textarea" />
              </Form.Item>
            </Col>
            <Col span={12} className="gutter-row">
              <Form.Item label="State"
               name="MSAD_State"
               rules={[
                 {
                   required: true,
                   message: "Please enter a category name",
                 },
               ]}>
                <Input type="textarea" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="ZIP"
          name="MSAD_ZipCode"
          rules={[
            {
              required: true,
              message: "Please enter a category name",
            },
          ]}
          >
            <Input type="textarea" />
          </Form.Item>
          <div style={{ textAlign: 'right' }} >
            <Button onClick={()=>closeModal(false)} style={{ marginRight: 8 }} >Cancel</Button>
            <Button  htmlType="submit" style={{ background: colors.primaryGreen, color: colors.white }}>Save</Button>
          </div>
        </Form>
      </Spin>
    </div>
  );
};

export default CategoryForm;
