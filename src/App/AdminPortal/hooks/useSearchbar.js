import React, { useState } from "react";
import { Input, Select } from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { useDebouncedCallback } from "use-debounce";

import { shouldApplyFilter } from "../utils/apply-search";

import { useSearchParams } from "react-router-dom";
import axios from "axios";
const { Option } = Select;

const InputComponent = ({
  setSearchQuery,
  searchQuery,
  isServerSearch,
  url,
  setLoading,
  setResponse,
}) => {
  let [searchParams, setSearchParams] = useSearchParams();
  let pageSize = searchParams.get("pageSize");
  let page = searchParams.get("page");

  const debounceFetcher = useDebouncedCallback(async (value) => {
    const correctUrl = url + `?search=${value}`;
    setLoading(true);
    await axios
      .get(correctUrl)
      .then((response) => {
        setLoading(false);
        setResponse(response?.data?.data);
      })
      .catch((error) => `error in search:${error}`);
  }, 600);

  const handleSearch = (e) => {
    if (isServerSearch) {
      setSearchQuery(e.target.value);
      debounceFetcher(e.target.value);
      if (e.target.value) {
        setSearchParams(
          `?page=${page}&pageSize=${pageSize}&search=${e.target.value}`
        );
      } else {
        setSearchParams(`?page=${1}&pageSize=${10}`);
      }
    } else {
      setSearchQuery(e.target.value);
    }
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
    <Input
      addonAfter={selectAfter}
      size="large"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleSearch}
      style={{
        width: 400,
      }}
      allowClear
      prefix={
        <SearchOutlined
          style={{
            color: "rgba(0,0,0,.45)",
          }}
        />
      }
    />
  );
};

const useSearchbar = (data, url, isServerSearch, inputProps = {}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const filteredData =
    data?.filter((o) => shouldApplyFilter(o, searchQuery)) || [];

  // Clint side searchBar
  const clientSearch = [
    filteredData,
    loading,
    <InputComponent
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      isServerSearch={isServerSearch}
      {...inputProps}
    />,
    searchQuery,
    setSearchQuery,
  ];

  // Server side searchBar
  const serverSearch = [
    response,
    loading,
    <InputComponent
      searchQuery={searchQuery}
      url={url}
      setLoading={setLoading}
      isServerSearch={isServerSearch}
      setResponse={setResponse}
      setSearchQuery={setSearchQuery}
      {...inputProps}
    />,
    searchQuery,
    setSearchQuery,
  ];

  if (isServerSearch) {
    return serverSearch;
  } else {
    return clientSearch;
  }
};

export default useSearchbar;

// TODO: Add property(s) select field to narrow the search
// TODO: Add clear search button
// TODO: Add persistent option
