import { Table } from 'antd';
import React, { useState } from 'react';

import ExcelButton from '@/components/custom/ExcelButton';

import ReportsColumns from './ReportsColumns';

function Reports() {
  const [tableData, setTableData] = useState([]);

  const columns = ReportsColumns();

  return (
    <div style={{ overflow: 'hidden', height: ' 100vh' }}>
      <ExcelButton />
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
