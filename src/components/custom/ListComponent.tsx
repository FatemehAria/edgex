import React, { useEffect, useState } from 'react';

import { deleteValues, getLists, updateValues } from '@/pages/person-company-info/util';
import { Modal, Table } from 'antd';
import { useLocale } from '@/locales';

interface ListComponentProps {
  deleteEndpoint: string;
  deleteId: string;
  getListEndpoint: string;
  columnsComponent: any;
  updateEndpoint: string;
  updateId: any;
  ModalComponent: any;
}

function ListComponent({
  deleteEndpoint,
  deleteId,
  getListEndpoint,
  columnsComponent,
  updateEndpoint,
  updateId,
  ModalComponent,
}: ListComponentProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRowForEdit, setSelectedRowForEdit] = useState(null);
  const { formatMessage } = useLocale();
  const [tableData, setTableData] = useState<any[]>([
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

  const deleteRow = (key: string) => {
    setTableData(prevData => {
      return prevData.filter(row => row.key !== key);
    });

    // API CALL FOR DELETING PERSON/COMPANY
    deleteValues(deleteEndpoint, deleteId);
  };

  useEffect(() => {
    // API CALL FOR GETTING USERS LIST
    getLists(getListEndpoint, setTableData);
  }, []);

  const handleEdit = (record: any) => {
    setSelectedRowForEdit(record);
    setIsEditModalOpen(true);
  };

  const columns = columnsComponent({ deleteRow, handleEdit });

  const handleUpdate = (updatedData: any) => {
    setTableData(prevData => prevData.map(row => (row.key === updatedData.key ? updatedData : row)));
    setIsEditModalOpen(false);
    // API CALL FOR SENDING NEW VALUES
    updateValues(updateEndpoint, updatedData, updateId);
  };

  return (
    <React.Fragment>
      <Table
        dataSource={tableData}
        columns={columns}
        pagination={false}
        className="custom-footer-table"
        // scroll={{ x: 2000 }}
      />
      <Modal title="ویرایش اطلاعات" open={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} footer={null}>
        <ModalComponent initialValues={selectedRowForEdit || {}} onSubmit={handleUpdate} showButton={true} />
      </Modal>
    </React.Fragment>
  );
}

export default ListComponent;
