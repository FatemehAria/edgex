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

  const deleteRow = (key: string) => {
    setTableData(prevData => {
      const rowToDelete = prevData.find(row => row.key === key);

      if (rowToDelete && prevData[0].key === rowToDelete.key) {
        return prevData;
      }

      return prevData.filter(row => row.key !== key);
    });
  };
  // useEffect(() => {
  //   getListOfPersonCompany(setTableData);
  // }, []);

  const columns = ListOfPersonTableColumns({ deleteRow });

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
