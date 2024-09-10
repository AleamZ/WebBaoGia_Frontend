import React from 'react';
import { Table } from 'antd';

const PhoneTable = ({ series, data, columns }) => {
  // Hàm định dạng tiền tệ VND
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const columnDefinitions = {
    name: { title: 'Name', dataIndex: 'name', key: 'name' },
    capacity: { title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
    color: { title: 'Color', dataIndex: 'color', key: 'color' },
    code: { title: 'Code', dataIndex: 'code', key: 'code' },
    battery: { title: '%Battery', dataIndex: 'battery', key: 'battery' },
    condition: { title: 'Condition', dataIndex: 'condition', key: 'condition' },
    sellingPrice: { 
      title: 'Selling Price', 
      dataIndex: 'sellingPrice', 
      key: 'sellingPrice', 
      render: (value) => formatCurrency(value)  // Định dạng tiền tệ
    },
    purchasePrice: { 
      title: 'Purchase Price', 
      dataIndex: 'purchasePrice', 
      key: 'purchasePrice', 
      render: (value) => formatCurrency(value)  // Định dạng tiền tệ
    },
    source: { title: 'Source', dataIndex: 'source', key: 'source' },
  };

  const tableColumns = columns.map((col) => columnDefinitions[col]);

  return (
    <div className="table-container">
      <h2>{series} </h2>
      <Table
        columns={tableColumns}
        dataSource={data}
        rowKey="code"
        pagination={{ pageSize: 25, hideOnSinglePage: true }} // Limits to 25 items per page and hides pagination if only 1 page
      />
    </div>
  );
};

export default PhoneTable;
