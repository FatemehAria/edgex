import type { ColumnType } from 'antd/es/table';

import { Select, Table, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ListButtons from '@/components/custom/ListButtons';

import ReportsColumns from './ReportsColumns';
import { getConfirmedReportsData } from './util';

const { Option } = Select;

function ApprovedProformaReports() {
  const { token } = theme.useToken();
  const { locale } = useSelector(state => state.user);
  const [reports, setReports] = useState([]);
  const allColumns = ReportsColumns();
  const defaultColumnKeys = allColumns.map(column => column.key);

  // console.log('defaut key', defaultColumnKeys);

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
    getConfirmedReportsData(setReports);
  }, []);

  return (
    <div style={{ backgroundColor: token.colorBgBlur }}>
      <ListButtons
        route="https://edgex.liara.run/api/ReportPerformaInvoiceHeaderDetailConfirmed/export-excel"
        title="confirmed_report_export"
      />
      <div>
        <Select
          mode="multiple"
          style={{ width: '100%', marginBottom: '1rem' }}
          // placeholder="Select columns to display"
          value={selectedColumnKeys}
          onChange={handleSelectChange}
          showSearch={false}
        >
          {allColumns.map(column => (
            <Option key={column.key} value={column.key}>
              {column.title}
            </Option>
          ))}
        </Select>

        <Table
          dataSource={reports}
          columns={visibleColumns as ColumnType<any>[]}
          scroll={{ x: 'max-content' }}
          pagination={{ position: locale === 'en_US' ? ['bottomLeft'] : ['bottomRight'] }}
        />
      </div>
    </div>
  );
}

export default ApprovedProformaReports;
