import React, { useEffect, useState } from "react";
import useSWR from "swr";
import {
  Form,
  Input,
  Col,
  Row,
  Spin,
  Button,
  Space,
  DatePicker,
  Select,
  Typography,
  Divider,
  Upload,
  Image,
  message
} from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import ImageUpload from '../../../components/ImageUpload';

import { colors } from "../../../utils/colors";
import { imageUploadProps } from "./helpers";
import uploadIcon from "./images/uploadIcon.svg";
import variantIcon from "./images/variant.svg";
import rightArrow from "./images/rightArrow.svg";
import downArrow from "./images/downArrow.svg";
import trashImg from "./images/trash.svg";
import uploadImage from './images/uploadImage.svg';
import { BASE_URL } from "../../../utils/constants";

const { Dragger } = Upload;
const { Option } = Select;
const { Text, Title } = Typography;

const AddNewRewardForm = ({
  id,
  form,
  handleSubmit,
  toggleModal,
  categories,
  loading
}) => {
  const [changeIcon, setChangeIcon] = useState(false);
  const [file, setFile] = useState();
  const [previewUrl, setImageUrl] = useState(['']);
 let pos = 0
  const handleFileUpload = (file ) => {
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFile(file);
      setImageUrl(reader.result);
    };
  };
 
  return (
    <Spin spinning={loading}>
      <Form form={form} layout="vertical" initialValues={{ users: [undefined] }} onFinish={handleSubmit}>
        <Row gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}>
          <Col className="gutter-row" span={12}>
            <Form.Item
              label="Reward Name"
              name="reward_name"
              rules={[{ required: true, message: "Please enter a name" }]}
            >
              <Input size="large" placeholder="5 Days tour to Malaysia" />
            </Form.Item>

            <Text onClick={toggleModal} style={{ position: 'absolute', right: 21, zIndex: 1000, color: colors.primaryGreen, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>+ add new category</Text>
            <Form.Item
              label="Reward Category"
              name="reward_category"
              rules={[{ required: true, message: "Select Category" }]}
            >
              <Select placeholder="Select Category" size="large">
                {categories.map((item) => <Option value={item.ARLC_KeyID}>{item.ARLC_Title}</Option>)}
              </Select>
            </Form.Item>
            <Form.Item
              label="Add Description"
              name="description"
              rules={[
                { required: true, message: "Please enter a description" },
              ]}
            >
              <Input size="large" placeholder="Description" />
            </Form.Item>
            <Row gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}>
              <Col span={12}>
                <Form.Item
                  label="Quantity"
                  name="quantity"
                  rules={[{ required: true, message: "Please select a quantity" }]}
                >
                  <Input type="number" size="large" placeholder="Select Quantity" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Redeem On Points"
                  name="radeem_on_points"
                  rules={[{ required: true, message: "Please select a point" }]}
                >
                  <Input type="number" size="large" placeholder="Select Point" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Start date"
                  name="start_date"
                  rules={[{ required: true, message: "Please enter a date" }]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="Select Date"
                    size="large"
                    format="DD/MM/YYYY"

                  />

                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item

                  label="Expiry date"
                  name="expiry_date"
                  rules={[{ required: true, message: "Please enter a date" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        !value ||
                        new Date(getFieldValue("start_date")) < new Date(getFieldValue("expiry_date"))
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Expiry Date must be greater than start date")
                      );
                    },
                  }),
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="Select Date"
                    size="large"
                    format="DD/MM/YYYY"

                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Please select a status" }]}
            >
              <Select placeholder="Active" size="large">
                <Option value={true}>Active</Option>
                <Option value={false}>Inactive</Option>
              </Select>
            </Form.Item>
            <Row >
              <Col span={24} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 50,
              }}>
                <Button
                  style={{ backgroundColor: colors.secondaryOrange }}
                  type="primary"
                  htmlType="submit"
                >
                  Save as draft
                </Button>
                <Space direction="horizontal" size={20}>
                  <Button
                    style={{ color: colors.black }}
                    type="default"
                    onClick={() => {
                      form.resetFields();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Publish
                  </Button>
                </Space>
              </Col>

            </Row>


          </Col>
          <Col className="gutter-row" span={12}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Row>
                <Col span={24}>
                  <div >
                    <Dragger style={{ width: 450 }} {...imageUploadProps}>
                      <div>
                        <img src={uploadIcon} alt="upload" width={36} height={36} />
                      </div>
                      <Row style={{ paddingLeft: "22%" }}>
                        <p
                          className="ant-upload-text"
                          style={{ marginRight: 5, color: colors.primaryGreen }}
                        >
                          Click to upload
                        </p>
                        <p className="ant-upload-text">or drag and drop</p>
                      </Row>
                      <Typography.Text className="ant-upload-hint">
                        PNG, JPG, up to 10MB
                      </Typography.Text>
                    </Dragger>
                    <Divider style={{ marginTop: 30 }} type="horizontal" />

                  </div>
                </Col>
              </Row>
            </div>

            <div style={{ padding: 50 }} >
              <div >
                <Title level={5} style={{ color: colors.black, textAlign: 'left' }}>
                  Add Variant
                </Title>
                <div
                  onClick={() => setChangeIcon(!changeIcon)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    marginTop: -6,
                  }}
                >
                  <Text>Upload Variant image and assign name to variant   </Text>
                  <Image
                    style={{ position: 'relative', left: 0 }}
                    preview={false}
                    src={changeIcon ? downArrow : rightArrow}
                    alt="icon"
                  />
                </div>
              </div>
              {changeIcon && (
                <div>
                  <div
                    style={{
                      padding: 20,
                      backgroundColor: colors.bgGrey,
                      borderRadius: 8,
                    }}
                  >
                    <Form.List name="users">
                      {(fields, { add, remove }) => (

                        <>
                          {fields.map(({ key, name, ...restField }, index) => (
                            <Space
                              key={key}
                            >
                              <Form.Item
                                {...restField}
                                name={[name, 'image']}
                              >
                              
                               <Upload
                                  name="avatar"
                                  listType="picture-card"
                                  className="avatar-uploader"
                                  showUploadList={false}
                                  beforeUpload={(file) => {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                      let data ={ ...previewUrl} ;
                                      data[index] = reader.result
                                      setImageUrl(data);
                                    };
                                    reader.readAsDataURL(file);
                                    return false;
                                  }}
                                  onChange={(info ) => {
                                   
                                    if (info.file.status === 'uploading') {
                                      
                                      // show loading icon while uploading
                                      // setLoading(true);
                                      return;
                                    }
                                    if (info.file.status === 'done') {
                                      // handle file upload
                                     
                                      handleFileUpload(info.file.originFileObj );
                                      // setLoading(false);
                                    }
                                  }}
                                >
                                  {previewUrl[index]? (
                                    <img src={previewUrl[index]} alt="avatar" style={{ width: '100%' , height : '100%' }} />
                                  ) : (
                                    <div>
                                      {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                      <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                  )}
                                </Upload>
                               

                              </Form.Item>

                              <Form.Item
                                {...restField}
                                name={[name, 'variant']}

                                rules={[
                                  {
                                    required: true,
                                    message: 'Missing variant',
                                  },
                                ]}
                              >
                                <Input size="large"  />
                              </Form.Item>
                              <Form.Item>
                              {index !== 0 ?
                                <Button onClick={() => remove(name)}>
                                  <Image
                                    preview={false}
                                    src={trashImg}
                                  />
                                </Button> : ''
                              }
                              </Form.Item>                           
                            </Space>
                          ))}
                          <Form.Item >
                            <Button style={{ color: colors.primaryGreen, fontWeight: 500 }} type="dashed"   onClick={() => add() } block icon={<PlusOutlined />}>
                              Add Variant
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>

                  </div>
                </div>
              )}
            </div>

          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default AddNewRewardForm;
