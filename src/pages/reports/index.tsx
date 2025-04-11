import { Select, Table, theme } from 'antd';
import React, { useEffect, useState } from 'react';

import ListButtons from '@/components/custom/ListButtons';

import ReportsColumns from './ReportsColumns';
import { getReportsData } from './util';

const { Option } = Select;

function Reports() {
  const [reports, setReports] = useState([]);
  const { token } = theme.useToken();
  const allColumns = ReportsColumns();
  const defaultColumnKeys = allColumns.map(column => column.key);

  console.log('defaut key', defaultColumnKeys);

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

  useEffect(() => {
    getReportsData(setReports);
  }, []);

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

        <Table dataSource={reports} columns={visibleColumns} scroll={{ x: 2000 }} />
      </div>
    </div>
  );
}

export default Reports;
