import './index.css';

import { Table } from 'antd';
import { useEffect, useState } from 'react';

import { ListOfPersonTableColumns } from './ListOfPersonTableColumns';
import { getListOfPersonCompany } from './util';

function ListOfPersonCompany() {
  const [tableData, setTableData] = useState([
    {
      key: '1',
      code: '213678',
      type: 'حقوقی',
      title: 'Danone',
    },
    {
      key: '2',
      code: '213679',
      type: 'حقوقی',
      title: 'Danone',
    },
  ]);

  // useEffect(() => {
  //   getListOfPersonCompany(setTableData);
  // }, []);

  const columns = ListOfPersonTableColumns();

  return (
    <div style={{ overflow: 'hidden', minHeight: ' 100vh' }}>
      <Table
        dataSource={tableData}
        columns={columns}
        pagination={false}
        className="custom-footer-table"
        // scroll={{ x: 2000 }}
      />
    </div>
  );
}

export default ListOfPersonCompany;
