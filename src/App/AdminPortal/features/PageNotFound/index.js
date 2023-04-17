import { Result } from "antd";
import React from "react";

const PageNotFound = () => {
  return (
    <Result
      style={{ marginTop: 100 }}
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
    />
  );
};

export default PageNotFound;
