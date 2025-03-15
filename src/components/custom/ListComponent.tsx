import { Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';

import { useLocale } from '@/locales';
import { deleteValues, getLists, updateValues } from '@/pages/person-company-info/util';

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
  const [selectedRowForEdit, setSelectedRowForEdit] = useState<any>(null);
  const { formatMessage } = useLocale();
  const [tableData, setTableData] = useState<any[]>([]);

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

  const copyRow = (record: any) => {
    setTableData(prevData => {
      const index = prevData.findIndex(row => row.key === record.key);

      const maxKey = prevData.reduce((max, row) => Math.max(max, Number(row.key)), 0);
      const newKey = (maxKey + 1).toString();

      const newRow = { ...record, key: newKey };

      const newData = [...prevData];

      newData.splice(index + 1, 0, newRow);

      return newData;
    });
  };

  const columns = columnsComponent({ deleteRow, handleEdit, copyRow });

  // const handleUpdate = (updatedData: any) => {
  //   setTableData(prevData => prevData.map(row => (row.key === updatedData.key ? updatedData : row)));
  //   setIsEditModalOpen(false);
  //   // console.log('edit id', selectedRowForEdit?.ID);
  //   // API CALL FOR SENDING NEW VALUES
  //   updateValues(updateEndpoint, updatedData, selectedRowForEdit?.ID);
  // };

  const handleUpdate = (updatedData: any) => {
    const mergedData = { ...selectedRowForEdit };

    Object.keys(updatedData).forEach(key => {
      if (updatedData[key] !== '' && updatedData[key] !== null && updatedData[key] !== undefined) {
        mergedData[key] = updatedData[key];
      }
    });

    setTableData(prevData => prevData.map(row => (row.key === mergedData.key ? mergedData : row)));
    setIsEditModalOpen(false);

    // Call API with the merged data (which retains unchanged fields)
    updateValues(updateEndpoint, mergedData, selectedRowForEdit?.ID);
  };

  return (
    <React.Fragment>
      <Table
        dataSource={tableData}
        columns={columns}
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
