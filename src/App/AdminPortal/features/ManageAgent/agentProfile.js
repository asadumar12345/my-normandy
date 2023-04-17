import React from 'react';
import useSWR from "swr";
import AdminAppLayout from "../../Layouts/AdminLayout";
import { useParams } from "react-router-dom";
import { Space, Typography, Row, Col, Divider, Image, Card , Spin } from 'antd';
import { colors } from "../../utils/colors";
import { BASE_URL } from "../../utils/constants";
import { GET_AGENT_BY_ID_API } from './constants';

const { Text, Link } = Typography;

export default function AgentProfile() {
    const {id} = useParams();
    const {
        data: agent,
        isValidating: loading,
        mutate,
    } = useSWR({
        url: BASE_URL + GET_AGENT_BY_ID_API + '?KeyId=' + id ,
    });
    return (
        <Spin  spinning={loading}>
            <AdminAppLayout >
                <div style={{
                    paddingLeft: 60,
                    paddingRight: 60,
                    marginTop: 40,
                    marginBottom: 20
                }}>
                    <Space>
                        <Text style={{ fontSize: 12, fontWeight: 500, color: colors.black }}>Mange Agent</Text>
                        <Text style={{ fontSize: 12, fontWeight: 500 }}>/Agent profile</Text>
                    </Space>
                    <p style={{ fontSize: 18, fontWeight: 600, color: colors.black, marginTop: 4 }}>Mange Agent</p>
                    <Divider />
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={6} style={{display : 'flex' , alignItems : 'center'}} >
                            <div >
                                <Image
                                    width={48}
                                    height={48}
                                    style={{ borderRadius: '100%' }}
                                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                />
                                {/* <Button style={{ color: colors.primaryBlue, marginLeft: 30, fontWeight: 500 }}>Edit detail</Button> */}
                                <p style={{ fontSize: 14, fontWeight: 500, marginTop: 8, color: colors.grey500 }}>{agent?.result?.ACAG_Name}</p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={6} >
                            <Card style={{boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}}>
                                <Space direction='vertical'  >
                                    <Text style={{ fontSize: 14, fontWeight: 500 }}>Available Points</Text>
                                    <Text style={{ fontSize: 24, fontWeight: 600, color: colors.black }}>{agent?.result?.ACAG_Available_Points ?agent?.result?.ACAG_Available_Points : 0 }</Text>
                                </Space>
                            </Card>
                        </Col>
                        <Col className="gutter-row" span={6} >
                            <Card style={{boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}}>
                                <Space direction='vertical'  >
                                    <Text style={{ fontSize: 14, fontWeight: 500 }}>Redeemable Points</Text>
                                    <Text style={{ fontSize: 24, fontWeight: 600, color: colors.black }}>{agent?.result?.ACAG_Points_Redeemed}</Text>
                                </Space>
                            </Card>
                        </Col>
                        <Col className="gutter-row" span={6} >
                            <Card style={{boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}}>
                                <Space direction='vertical'  >
                                    <Text style={{ fontSize: 14, fontWeight: 500 }}>Redeemed Points</Text>
                                    <Text style={{ fontSize: 24, fontWeight: 600, color: colors.black }}>{agent?.result?.ACAG_Points_Earned ?agent?.result?.ACAG_Points_Earned : 0 }</Text>
                                </Space>
                            </Card>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: 30 }}>
                        <Col className="gutter-row" span={8} >
                            <Space direction='vertical'  >
                                <Text style={{ fontSize: 14, fontWeight: 500 }}>Email Address</Text>
                                <Text style={{ fontSize: 14, fontWeight: 400, color: colors.black }}>{agent?.result?.ACAG_Email}</Text>
                            </Space>
                        </Col>
                        <Col className="gutter-row" span={8} >
                            <Space direction='vertical'  >
                                <Text style={{ fontSize: 14, fontWeight: 500 }}>Phone Number</Text>
                                <Text style={{ fontSize: 14, fontWeight: 400, color: colors.black }}>{agent?.result?.ACAG_Phone}</Text>
                            </Space>
                        </Col>
                        <Col className="gutter-row" span={8} >

                        </Col>
                    </Row>
                    <Row style={{ marginTop: 30 }}>
                        <Col className="gutter-row" span={8} >
                            <Space direction='vertical'  >
                                <Text style={{ fontSize: 14, fontWeight: 500 }}>Agency Name</Text>
                                <Text style={{ fontSize: 14, fontWeight: 400, color: colors.black }}>{agent?.result?.ACAG_Agency_Name}</Text>
                            </Space>
                        </Col>
                        <Col className="gutter-row" span={8} >
                            <Space direction='vertical'  >
                                <Text style={{ fontSize: 14, fontWeight: 500 }}>Street Address 1 </Text>
                                <Text style={{ fontSize: 14, fontWeight: 400, color: colors.black }}>{agent?.result?.tbl_MSAD_Addresses?.MSAD_Address_Line1}</Text>
                            </Space>
                        </Col>
                        <Col className="gutter-row" span={8} >

                        </Col>
                    </Row>
                    <Row style={{ marginTop: 30 }}>
                        <Col className="gutter-row" span={8} >
                            <Space direction='vertical'  >
                                <Text style={{ fontSize: 14, fontWeight: 500 }}>Street address 2</Text>
                                <Text style={{ fontSize: 14, fontWeight: 400, color: colors.black }}>{agent?.result?.tbl_MSAD_Addresses?.MSAD_Address_Line2}</Text>
                            </Space>
                        </Col>
                        <Col className="gutter-row" span={8} >
                            <Space direction='vertical'  >
                                <Text style={{ fontSize: 14, fontWeight: 500 }}>City</Text>
                                <Text style={{ fontSize: 14, fontWeight: 400, color: colors.black }}>Houston, Texas</Text>
                            </Space>
                        </Col>
                        <Col className="gutter-row" span={8} >

                        </Col>
                    </Row>
                    <Row style={{ marginTop: 30 }}>
                        <Col className="gutter-row" span={8} >
                            <Space direction='vertical'  >
                                <Text style={{ fontSize: 14, fontWeight: 500 }}>State</Text>
                                <Text style={{ fontSize: 14, fontWeight: 400, color: colors.black }}> {agent?.result?.tbl_MSAD_Addresses?.MSAD_State}</Text>
                            </Space>
                        </Col>
                        <Col className="gutter-row" span={8} >
                            <Space direction='vertical'  >
                                <Text style={{ fontSize: 14, fontWeight: 500 }}>ZIP</Text>
                                <Text style={{ fontSize: 14, fontWeight: 400, color: colors.black }}>{agent?.result?.tbl_MSAD_Addresses?.MSAD_ZipCode}</Text>
                            </Space>
                        </Col>
                        <Col className="gutter-row" span={8} >

                        </Col>
                    </Row>
                </div>
            </AdminAppLayout>
        </Spin>
    )
}
