import { Table } from 'antd';
import React, { useState } from 'react';

import ListButtons from '@/components/custom/ListButtons';

import ReportsColumns from './ReportsColumns';

function Reports() {
  const [tableData, setTableData] = useState([]);

  const columns = ReportsColumns();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
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
