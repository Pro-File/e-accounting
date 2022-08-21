import { Table } from "antd";
import React, { useState } from "react";

const CustomTable = ({ loading, columns, data }) => {
  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      pagination={{
        position: ["bottomCenter"],
      }}
      scroll={{
        x: 756,
      }}
    />
  );
};

export default CustomTable;
