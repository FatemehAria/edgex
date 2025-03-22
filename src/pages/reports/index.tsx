import { Table, theme } from 'antd';
import React, { useState } from 'react';

import ListButtons from '@/components/custom/ListButtons';

import ReportsColumns from './ReportsColumns';

function Reports() {
  const [tableData, setTableData] = useState([]);
  const { token } = theme.useToken();

  const columns = ReportsColumns();

  return (
    <div style={{ height: '100vh', backgroundColor: token.colorBgBlur }}>
      <ListButtons />
      <Table
        dataSource={tableData}
        columns={columns}
        className="custom-footer-table"
        // scroll={{ x: 2000 }}
      />
    </div>
  );
}

export default Reports;
