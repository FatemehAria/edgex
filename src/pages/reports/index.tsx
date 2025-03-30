import { Select, Table, theme } from 'antd';
import React, { useState } from 'react';

import ListButtons from '@/components/custom/ListButtons';

import ReportsColumns from './ReportsColumns';

const { Option } = Select;

function Reports() {
  const [tableData, setTableData] = useState([]);
  const { token } = theme.useToken();
  const allColumns = ReportsColumns();
  const defaultColumnKeys = allColumns.map(column => column.key);

  const [selectedColumnKeys, setSelectedColumnKeys] = useState(defaultColumnKeys);

  const handleSelectChange = (selectedKeys: any) => {
    if (selectedKeys.length === 0) {
      setSelectedColumnKeys(defaultColumnKeys);
    } else {
      setSelectedColumnKeys(selectedKeys);
    }
  };

  const visibleColumns = selectedColumnKeys.length
    ? allColumns.filter(column => selectedColumnKeys.includes(column.key))
    : allColumns;

  return (
    <div style={{ height: '100vh', backgroundColor: token.colorBgBlur }}>
      <ListButtons />
      <div>
        <Select
          mode="multiple"
          style={{ width: '100%', marginBottom: '1rem' }}
          // placeholder="Select columns to display"
          value={selectedColumnKeys}
          onChange={handleSelectChange}
          showSearch={false}
        >
          {visibleColumns.map(column => (
            <Option key={column.key} value={column.key}>
              {column.title}
            </Option>
          ))}
        </Select>

        <Table dataSource={tableData} columns={visibleColumns} />
      </div>
    </div>
  );
}

export default Reports;
