import React from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Table, Typography  } from "antd";

import { colors } from "../../utils/colors";

const { Text } = Typography;

const TableComponent = (props) => {
  let [searchParams] = useSearchParams();
  let currentPage = searchParams.get("page");

  return (
    <div style={{ position: "relative" }}>
      <Table
        rowKey="id"
        rowSelection={
          !props.rowSelection
            ? null
            : {
                onChange: (_, selectedRows) => {
                  props.setSelectedRows(selectedRows);
                },
              }
        }
        style={{
          border: `1px solid ${colors.grayNeutral100}`,
          borderRadius: 6,
        }}
        size="small"
        className="tableHeight"
        dataSource={props.data}
        loading={props.loading}
        columns={props.columns}
        pagination={
          props.isServerPagination
            ? {
                current: parseInt(currentPage),
                total: props.pagination.totalPage,
                pageSize: props.pagination.pageSize,
                onChange: props.onPaginationChange,
                showQuickJumper: true,
                showSizeChanger: true,
                showTitle: true,
                style: { paddingRight: 20 },
              }
            : {
                defaultCurrent: 1,
              }
        }
        scroll={{ x: "max-content", y: "calc(100vh - 310px)" }}
      />
      <Text
        style={{ position: "absolute", left: 10, bottom: 20, color: "#374151" }}
      >
        Showing 1 to {props.pagination.pageSize} of {props?.data?.length}{" "}
        results
      </Text>
       
    </div>
  );
};

TableComponent.propTypes = {
  data: PropTypes.array,
  tableData: PropTypes.array,
  loading: PropTypes.bool,
  border: PropTypes.bool,
  rowSelection: PropTypes.bool,
  columns: PropTypes.array,
  isServerPagination: PropTypes.bool,
  pagination: PropTypes.any,
  onPaginationChange: PropTypes.func,
  setSelectedRows: PropTypes.func,
};

export default TableComponent;
