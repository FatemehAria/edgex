import { Table } from 'antd';
import React, { useState } from 'react';

import BackButton from '@/components/custom/BackButton';
import ExcelButton from '@/components/custom/ExcelButton';

import ReportsColumns from './ReportsColumns';

function Reports() {
  const [tableData, setTableData] = useState([]);

  const columns = ReportsColumns();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ExcelButton />
        <BackButton />
      </div>
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
