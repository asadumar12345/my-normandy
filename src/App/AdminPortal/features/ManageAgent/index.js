import React, { useState, useEffect } from 'react';
import { Space, Typography, Button, Input, Row, Col, message, Modal, Form, Select, Card, Alert, Upload } from 'antd';
import { useNavigate } from "react-router";
import useSWR from "swr";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams } from "react-router-dom";
import { getColumns } from "./columns";
import { dummyData } from "./dummyData";
import { colors } from "../../utils/colors";
import TableComponent from "../../components/Table/TableComponent";
import EditForm from "./form";
import {
    generateSearchParamsGetter,
    getNewSearchParamStringWithArgs,
    getSearchParams,
} from "../../utils/helpers";

import { FilterOutlined, SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import AdminAppLayout from "../../Layouts/AdminLayout";
import { BASE_URL } from "../../utils/constants";
import { ALL_AGENTS_API , EDIT_AGENT_API } from './constants';
import { routes } from "../../utils/constants";
import csvIcon from "./images/CSV.svg";
import exelIcon from "./images/exel.svg";

const { Text, Link } = Typography;
const { Option } = Select;
const { Dragger } = Upload;


const ManageAgent = () => {
    const [form] = Form.useForm();
    let [spObj, setSearchParams] = useSearchParams();
    const [id, page, pageSize, search] = getSearchParams(spObj);
    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [noteModalOpen, setNoteModal] = useState(false);
    const navigate = useNavigate();
    const handleSearch = (e) => {
        debounceFetcher(e.target.value);
    };
    const [selectedRows, setSelectedRows] = useState();
    const getNewSearchParamString = generateSearchParamsGetter(spObj);

    const mutateSearchParams = () => setSearchParams(getNewSearchParamString());

    const debounceFetcher = useDebouncedCallback((search) => {
        setSearchParams(
            getNewSearchParamStringWithArgs({ page: 1, pageSize, search })
        );
    }, 600);
    const Redirect = (id) => {
        navigate(`${routes.MANAGEAGENT}${routes.AGENTPROFILE}/${id}`)
    }
    const editDetail = (id) => {
        setSearchParams(`${getNewSearchParamString()}&id=${id}`);
        // console.log('modal id => ', id)
        setModalOpen(true);
    };
    const {
        data: agents,
        isValidating: loading,
        mutate,
    } = useSWR({
        url: BASE_URL + ALL_AGENTS_API + getNewSearchParamString(),
    });
    useEffect(() => {
        if (agents) {
            setData(agents?.result);
        }
    }, [agents]);

    useEffect(() => {
        if (mutate) mutate();
    }, [search, pageSize, page, mutate]);

    const activeData = agents?.result?.filter((item) => item.ACAG_Is_Active);
    const InactiveData = agents?.result?.filter((item) => !item.ACAG_Is_Active);

    const popoverContent = () => {
        return (
            <div style={{ width: 396, height: 314, overflowY: 'scroll', overflowX: 'hidden' }}>
                {
                    [1, 2, 4, 5, 6, 7].map(() => <div className="hoverAffect" onClick={() => { setNoteModal(true) }}>
                        <p style={{ cursor: 'pointer', padding: 10, marginTop: 7 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed urna nulla vitae laoreet augue. </p>
                        <p style={{ textAlign: 'right', fontSize: 10, fontWeight: 400, color: colors.black, marginRight: 4 }}>Today 3:49 PM</p>
                    </div>)
                }
            </div>

        )
    }
    const onPaginationChange = async (page, pageSize) => {
        setSearchParams(
            getNewSearchParamStringWithArgs({ page, pageSize, search })
        );
    };
    //upload file props
    const props = {
        name: "file",
        multiple: true,
        // action: BASE_URL + UPLOAD_API,
        // headers: {
        //     authorization: `Bearer ${TOKEN}`,
        // },
        beforeUpload: (file) => {
            const isCorrectType =
                file.type === "text/csv" ||
                file.type === "text/xls" ||
                file.type === "text/xlsx";
            if (!isCorrectType) {
                message.error("You can only upload csv/xls/xlsx files!");
            }
            const isCorrectSize = file.size / 1024 / 1024 <= 5;
            if (!isCorrectSize) {
                message.error("File must be smaller than 5MB!");
            }
            return isCorrectType && isCorrectSize;
        },
        onChange(info) {
            const { status } = info.file;
            if (status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (status === "done") {
                message.success(`${info.file.name} File uploaded successfully.`);
            } else if (status === "error") {
                message.error(`File upload failed, Missing or invalid fields.`);
            }
        },
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files);
        },
    };
    const columns = getColumns({ editDetail, popoverContent, Redirect });
    const handleSubmit = (values) => {
        console.log(values);
        let updateData = {...values};
        delete updateData.City ;
        const data = {ACAG_KeyID : id,tbl_MSAD_Addresses : updateData}
        console.log('updateData',data);
        mutate(async () => {
          try {
              const response = await axios.put(EDIT_AGENT_API, data);
              message.success(response?.data?.message);
            //   closeModal();
          } catch (e) {
            console.log(e);
          }
        });
      };
    const selectAfter = (
        <>
            <FilterOutlined
                style={{
                    color: "rgba(0,0,0,.45)",
                    marginRight: 10,
                }}
            />
            <Select placeholder="Filters">
                <Option value="filter1">filter1</Option>
                <Option value="filter2">filter2</Option>
            </Select>
        </>
    );

    return (
        <AdminAppLayout >
            <div style={{
                paddingLeft: 60,
                paddingRight: 60,
                marginTop: 56,
                marginBottom: 20
            }}>
                <Row style={{ marginBottom: 15 }}
                    gutter={{
                        xs: 8,
                        sm: 16,
                        md: 24,
                        lg: 32,
                    }}
                >
                    <Col className="gutter-row" span={6}>
                        <div >
                            <Card style={{ background: colors.bgGrey }}>
                                <Space direction='vertical'>
                                    <Text style={{ fontSize: 14, fontWeight: 500, color: colors.black }}>Total Agents</Text>
                                    <Text style={{ fontSize: 30, fontWeight: 600, color: colors.black }}>{agents?.totalRecords}</Text>
                                </Space>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div >
                            {/* <Card style={{ background: colors.bgGrey }}> */}

                            <Dragger style={{ background: colors.bgGrey, textAlign: 'left', paddingLeft: 25 }}  {...props}>
                                <p style={{ color: colors.black, paddingBottom: 25, fontSize: 14, fontWeight: 500 }} >Import Agent Profiles via</p>
                                <Space>
                                    <img src={csvIcon} alt="upload" />
                                    <p>or</p>
                                    <img src={exelIcon} alt="upload" />
                                </Space>
                            </Dragger>

                            {/* </Card> */}
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>

                    </Col>
                    <Col className="gutter-row" span={6}>

                    </Col>
                </Row>
                <Row style={{ marginTop: 30, marginBottom: 28 }} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={8} >
                        <div >
                            <Input
                                addonAfter={selectAfter}
                                size={'large'}
                                placeholder="Search Rewards..."
                                defaultValue={search}
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
                    <Col className="gutter-row" span={8}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Space direction="horizontal" size={40}>
                                {[
                                    {
                                        btnText: "All",
                                        total: agents?.result?.length,
                                        onClick: () => {
                                            setActiveTab(0);
                                            setData(agents?.result);
                                        },
                                    },
                                    {
                                        btnText: "Active",
                                        total: activeData?.length,
                                        onClick: () => {
                                            setActiveTab(1);
                                            setData(activeData);
                                        },
                                    },
                                    {
                                        btnText: "Inactive",
                                        total: InactiveData?.length,
                                        onClick: () => {
                                            setActiveTab(2);
                                            setData(InactiveData);
                                        },
                                    },
                                ].map((item, i) => (
                                    <Button
                                        style={{
                                            color: activeTab === i && colors.grey900,
                                            backgroundColor: activeTab === i && colors.grayNeutral100,
                                        }}
                                        key={item.btnText}
                                        onClick={item.onClick}
                                        type="text"
                                    >
                                        {item.btnText} ({item.total})
                                    </Button>
                                ))}
                            </Space>
                        </div>
                    </Col>
                    <Col span={8} style={{ textAlign: 'right' }}>
                        <Button type="primary" icon={<DownloadOutlined />} size={'middle'}>
                            Export all Agents Profile
                        </Button>
                    </Col>
                </Row>

                {/* Table component */}
                <div >
                    <TableComponent
                        loading={loading}
                        rowSelection={true}
                        setSelectedRows={setSelectedRows}
                        data={data}
                        columns={columns}
                        border
                        onPaginationChange={onPaginationChange}
                        pagination={{
                            totalPage: agents?.totalPages * pageSize,
                            pageSize: pageSize,
                        }}
                        isServerPagination // true for serverSide pagination
                    />
                </div>
                {/* selected agent notification */}
                {selectedRows?.length > 0 ? <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', bottom: 46 }}>

                    <Alert style={{ width: '30%', backgroundColor: colors.primaryGreen, color: colors.white }} message={`${selectedRows?.length} Agents Selected`} action={
                        <Space>
                            <Button style={{ color: colors.white }} onClick={() => { setSelectedRows([]) }} size="small" type="text">
                                Cancel
                            </Button>
                            <Button style={{ color: colors.primaryGreen, background: colors.white }} size="small" type="text">
                                Export
                            </Button>
                        </Space>
                    }
                    />
                </div> : ''}
                {/* edit detail model */}

                <Modal onCancel={() => { setModalOpen(false) }} closable={true} open={modalOpen} footer={null}>
                    <EditForm
                        id={id}
                        form={form}
                        handleSubmit={handleSubmit}
                        listLoading={loading}
                        closeModal={setModalOpen}
                        // isEdit={isEdit}
                    />

                </Modal>
                {/* single note display modal */}
                <Modal
                    title={null}
                    centered
                    closable={true}
                    width={521}
                    footer={null}
                    open={noteModalOpen}
                    onOk={() => setNoteModal(false)}
                    onCancel={() => setNoteModal(false)}
                >
                    <div style={{ padding: 30 }} >
                        <Space direction='vertical'>
                            <Text style={{ fontSize: 24, fontWeight: 600, color: colors.black }}>Notes for admin</Text>
                            <Text style={{ fontSize: 14, fontWeight: 400 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed urna nulla vitae laoreet augue. Amet feugiat est integer dolor auctor adipiscing nunc urna, sit. </Text>
                            <Text style={{ fontSize: 16, fontWeight: 500, color: colors.black }}>Last note:</Text>
                            <Text style={{ fontSize: 14, fontWeight: 400 }}>Yesterday 3:49 PM</Text>
                        </Space>
                    </div>
                </Modal>

            </div>
        </AdminAppLayout>
    )
};
export default ManageAgent;
