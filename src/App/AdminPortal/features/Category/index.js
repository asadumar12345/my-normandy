import React, { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams } from "react-router-dom";
import { Button, Input, Modal, Form, Select, message, Typography } from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";

import TableComponent from "../../components/Table/TableComponent";
import {
  generateSearchParamsGetter,
  getNewSearchParamStringWithArgs,
  getSearchParams,
  isPositiveInteger,
} from "../../utils/helpers";
import AdminAppLayout from "../../Layouts/AdminLayout";
import { BASE_URL } from "../../utils/constants";

import {
  ADD_CATEGORY_API,
  ALL_CATEGORIES_API,
  DELETE_CATEGORY_API,
  EDIT_CATEGORY_API,
  FILTER_DATA_API,
} from "./constants";
import { getColumns } from "./columns";
import CategoryForm from "./form";

const { Option } = Select;
const { Text } = Typography;

const Category = () => {
  let [spObj, setSearchParams] = useSearchParams();
  const [id, page, pageSize, filterName] = getSearchParams(spObj);
  const [isEdit, setIsEdit] = useState(false);

  const getNewSearchParamString = generateSearchParamsGetter(spObj);

  const mutateSearchParams = () => setSearchParams(getNewSearchParamString());

  const debounceFetcher = useDebouncedCallback((search) => {
    setSearchParams(
      getNewSearchParamStringWithArgs({ page: 1, pageSize, search })
    );
  }, 600);

  const [form] = Form.useForm();

  let url = BASE_URL + ALL_CATEGORIES_API + getNewSearchParamString();
  let filterApiUrl = BASE_URL + FILTER_DATA_API + getNewSearchParamString();
  const {
    data,
    isValidating: loading,
    mutate,
  } = useSWR({
    url: filterName ? filterApiUrl : url,
  });
  const openModal = (id) => {
    form.resetFields();
    setSearchParams(`${getNewSearchParamString()}&id=${id || "create"}`);
  };

  const closeModal = () => {
    form.resetFields();
    mutateSearchParams();
  };

  useEffect(() => {
    if (mutate) mutate();
  }, [filterName, pageSize, page, mutate]);

  const deleteCategory = (id) =>
    mutate(async () => {
      try {
        let response = await axios.put(DELETE_CATEGORY_API + `?Id=${id}`);
        message.success(response?.data.message);
      } catch (e) {
        console.log(e);
      }
    });

  const handleSubmit = (values) => {
    console.log(values);
    const updateData = {
      ARLC_KeyID: id,
      ARLC_Title: values.ARLC_Title,
    };
    mutate(async () => {
      try {
        if (id === "create") {
          const response = await axios.post(ADD_CATEGORY_API, values);
          message.success(response?.data?.message);
          closeModal();
        } else {
          await axios.put(EDIT_CATEGORY_API, updateData);
          message.success("Category updated successfully.");
        }
      } catch (e) {
        console.log(e);
      }
    });
  };

  const onPaginationChange = async (page, pageSize) => {
    setSearchParams(
      getNewSearchParamStringWithArgs({ page, pageSize, filterName })
    );
  };

  const columns = getColumns({
    deleteCategory,
    openModal,
    setIsEdit,
  });

  const handleSearch = (e) => {
    debounceFetcher(e.target.value);
  };

  return (
    <AdminAppLayout>
      <div
        style={{
          paddingLeft: 60,
          paddingRight: 60,
          marginTop: 56,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 72,
            marginBottom: 28,
          }}
        >
          <Input
            style={{ width: 480 }}
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

          <Button type="primary" onClick={() => openModal()}>
            + Add New Category
          </Button>
        </div>

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

        {/* Add category model component */}
        <Modal
          open={id === "create" || isPositiveInteger(id)}
          onCancel={() => {
            closeModal();
            form.resetFields();
          }}
          centered
          width={766}
          footer={null}
        >
          <CategoryForm
            id={id}
            form={form}
            handleSubmit={handleSubmit}
            listLoading={loading}
            closeModal={closeModal}
            isEdit={isEdit}
          />
        </Modal>
      </div>
    </AdminAppLayout>
  );
};
export default Category;
