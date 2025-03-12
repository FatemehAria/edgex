import './index.css';

import { Modal, Table } from 'antd';
import { useEffect, useState } from 'react';

import { useLocale } from '@/locales';

import { ListOfPersonTableColumns } from './ListOfPersonTableColumns';
import PersonCompanyInfo from './PersonCompanyInfo';
import { deleteValues, getListOfPersonCompany, updateValues } from './util';

function ListOfPersonCompany() {
  const { formatMessage } = useLocale();
  const [tableData, setTableData] = useState([
    {
      key: '1',
      code: '213678',
      'person-company-type': 'حقوقی',
      'person-company-title-persian': 'Danone',
      'person-company-email': 'Danone@gmail.com',
    },
    {
      key: '2',
      code: '213679',
      'person-company-type': 'حقوقی',
      'person-company-title-persian': 'Danone',
    },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRowForEdit, setSelectedRowForEdit] = useState(null);

  const deleteRow = (key: string) => {
    setTableData(prevData => {
      const rowToDelete = prevData.find(row => row.key === key);

      if (rowToDelete && prevData[0].key === rowToDelete.key) {
        return prevData;
      }

      return prevData.filter(row => row.key !== key);
    });

    // API CALL FOR DELETING PERSON/COMPANY
    deleteValues('/delete', '122');
  };

  useEffect(() => {
    // API CALL FOR GETTING USERS LIST
    getListOfPersonCompany(setTableData);
  }, []);

  const handleEdit = (record: any) => {
    setSelectedRowForEdit(record);
    setIsEditModalOpen(true);
  };

  const columns = ListOfPersonTableColumns({ deleteRow, handleEdit });

  const handleUpdate = (updatedData: any) => {
    setTableData(prevData => prevData.map(row => (row.key === updatedData.key ? updatedData : row)));
    setIsEditModalOpen(false);
    // API CALL FOR SENDING NEW VALUES
    updateValues('/update', '122');
  };

  return (
    <div style={{ overflow: 'hidden', minHeight: ' 100vh' }}>
      <Table
        dataSource={tableData}
        columns={columns}
        pagination={false}
        className="custom-footer-table"
        // scroll={{ x: 2000 }}
      />
      <Modal title="ویرایش اطلاعات" open={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} footer={null}>
        <PersonCompanyInfo initialValues={selectedRowForEdit || {}} onSubmit={handleUpdate} showButton={true} />
      </Modal>
    </div>
  );
}

export default ListOfPersonCompany;
