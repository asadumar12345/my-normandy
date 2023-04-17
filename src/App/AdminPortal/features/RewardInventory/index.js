import { Button, Input, Select, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { useNavigate } from "react-router";

import AdminAppLayout from "../../Layouts/AdminLayout";
import { colors } from "../../utils/colors";
import {
  generateSearchParamsGetter,
  getNewSearchParamStringWithArgs,
  getSearchParams,
} from "../../utils/helpers";

import { getColumns } from "./columns";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import TableComponent from "../../components/Table/TableComponent";
import { BASE_URL } from "../../utils/constants";
import { FILTER_DATA_API } from './constants';

const { Option } = Select;

const RewardInventory = () => {
  let [spObj, setSearchParams] = useSearchParams();
  const [id, page, pageSize, search] = getSearchParams(spObj);
  const navigate = useNavigate();
  const getNewSearchParamString = generateSearchParamsGetter(spObj);

  const mutateSearchParams = () => setSearchParams(getNewSearchParamString());

  const debounceFetcher = useDebouncedCallback((search) => {
    setSearchParams(
      getNewSearchParamStringWithArgs({ page: 1, pageSize, search })
    );
  }, 600);

  const {
    data: rewards,
    isValidating: loading,
    mutate,
  } = useSWR({
    url: BASE_URL + FILTER_DATA_API + getNewSearchParamString(),
  });

  useEffect(() => {
    if (mutate) mutate();
  }, [search, pageSize, page, mutate]);

  const onPaginationChange = async (page, pageSize) => {
    setSearchParams(
      getNewSearchParamStringWithArgs({ page, pageSize, search })
    );
  };

  const handleSearch = (e) => {
    debounceFetcher(e.target.value);
  };

  const [activeTab, setActiveTab] = useState(0);
  const [dataLoading, setDataLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (rewards) {
      setData(rewards?.result)
    }
  }, [rewards])

  const activeData = rewards?.result?.filter(
    (item) => item.ARLR_Is_Active
  );

  const InactiveData = rewards?.result?.filter(
    (item) => !item.ARLR_Is_Active
  );
  const draftData = rewards?.result?.filter(
    (item) => item.ARLR_Status === 2
  );
  const publishedData = rewards?.result?.filter(
    (item) => item.ARLR_Status === 1
  );

  const columns = getColumns({ navigate });

  useEffect(() => {
    setTimeout(() => {
      setDataLoading(false);
    }, 1000);
  }, [dataLoading]);

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
    <AdminAppLayout>
      <div
        style={{
          paddingLeft: 60,
          paddingRight: 60,
          marginTop: 56,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Space direction="horizontal" size={40}>
            {[
              {
                btnText: "All",
                total: rewards?.result?.length,
                onClick: () => {
                  setActiveTab(0);
                  setDataLoading(true);
                  setData(rewards?.result);
                },
              },
              {
                btnText: "Active",
                total: activeData?.length,
                onClick: () => {
                  setActiveTab(1);
                  setDataLoading(true);
                  setData(activeData);
                },
              },
              {
                btnText: "Inactive",
                total: InactiveData?.length,
                onClick: () => {
                  setActiveTab(2);
                  setDataLoading(true);
                  setData(InactiveData);
                },
              },
              {
                btnText: "Draft",
                total: draftData?.length,
                onClick: () => {
                  setActiveTab(3);
                  setDataLoading(true);
                  setData(draftData);
                },
              },
              {
                btnText: "Published",
                total: publishedData?.length,
                onClick: () => {
                  setActiveTab(4);
                  setDataLoading(true);
                  setData(publishedData);
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

          <div
            style={{
              display: "flex",
              width: 480,
              justifyContent: "flex-end",
            }}
          >
            <Input
              addonAfter={selectAfter}
              size="large"
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
        </div>
        <div style={{ marginTop: 28 }}>
          <TableComponent
            loading={loading}
            data={data}
            columns={columns}
            border
            pagination={{
              totalPage: rewards?.totalPages * pageSize,
              pageSize: pageSize,
            }}
            onPaginationChange={onPaginationChange}
            isServerPagination
          />
        </div>
      </div>
    </AdminAppLayout>
  );
};

export default RewardInventory;
