import { Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';

import { useLocale } from '@/locales';
// import { deleteValues, getLists, updateValues } from '@/pages/person-company-info/util';

interface ListComponentProps {
  deleteEndpoint: string;
  deleteId: string;
  getListEndpoint: string;
  columnsComponent: any;
  updateEndpoint: string;
  updateId: any;
  ModalComponent: any;
  getLists: any;
  deleteValues: any;
  updateValues: any;
  createListItem: any;
  transformData?: any;
  children?: React.ReactNode;
  setGroupValue?: React.Dispatch<React.SetStateAction<any[]>>;
  groupValue?: any[];
  catId?: any;
}

function ListComponent({
  deleteEndpoint,
  deleteId,
  getListEndpoint,
  columnsComponent,
  updateEndpoint,
  updateId,
  ModalComponent,
  deleteValues,
  getLists,
  updateValues,
  createListItem,
  transformData,
  children,
  setGroupValue,
  groupValue,
  catId,
}: ListComponentProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRowForEdit, setSelectedRowForEdit] = useState<any>(null);
  const [tableData, setTableData] = useState<any[]>([]);
  const [iseDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRowForDelete, setSelectedRowForDelete] = useState<any>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const deleteRow = (record: any) => {
    setSelectedRowForDelete(record);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    // API CALL FOR GETTING USERS LIST
    getLists(getListEndpoint, setTableData, setLoading);
  }, []);

  const handleEdit = (record: any) => {
    const rowToEdit = { ...record };

    if (!rowToEdit.isCopied) {
      rowToEdit.isCopied = false;
    }

    setSelectedRowForEdit(rowToEdit);
    setIsEditModalOpen(true);
    setIsCopied(rowToEdit.isCopied);
  };

  const copyRow = (record: any) => {
    // Determine where to insert the copied row
    const index = tableData.findIndex(row => row.key === record.key);
    const maxKey = tableData.reduce((max, row) => Math.max(max, Number(row.key)), 0);
    const newKey = (maxKey + 1).toString();

    // Create the copied row with a flag
    const newRow = { ...record, key: newKey, isCopied: true };

    // Insert the new row into tableData
    setTableData(prevData => {
      const newData = [...prevData];
      newData.splice(index + 1, 0, newRow);
      return newData;
    });

    // Open the modal for the copied row
    setSelectedRowForEdit(newRow);
    setIsEditModalOpen(true);
    setIsCopied(true);
  };

  // const copyRow = (record: any) => {
  //   setIsCopied(true);
  //   setTableData(prevData => {
  //     const index = prevData.findIndex(row => row.key === record.key);

  //     const maxKey = prevData.reduce((max, row) => Math.max(max, Number(row.key)), 0);
  //     const newKey = (maxKey + 1).toString();

  //     const newRow = { ...record, key: newKey, isCopied: true };

  //     const newData = [...prevData];

  //     newData.splice(index + 1, 0, newRow);

  //     return newData;
  //   });
  // };

  const columns = columnsComponent({ deleteRow, handleEdit, copyRow });

  const handleUpdate = (updatedData: any) => {
    const mergedData = { ...selectedRowForEdit };

    Object.keys(updatedData).forEach(key => {
      if (updatedData[key] !== '' && updatedData[key] !== null && updatedData[key] !== undefined) {
        mergedData[key] = updatedData[key];
      }
    });

    setTableData(prevData => prevData.map(row => (row.key === mergedData.key ? mergedData : row)));
    setIsEditModalOpen(false);

    // console.log(mergedData);

    const dataToCreate = transformData ? transformData(mergedData) : mergedData;

    console.log('dataToCreate', dataToCreate);

    if (isCopied) {
      createListItem(dataToCreate, catId);
    } else {
      updateValues(updateEndpoint, mergedData, selectedRowForEdit?.ID);
    }

    setIsCopied(false);
    setSelectedRowForEdit(null);
  };

  const handleOk = () => {
    setTableData(prevData => {
      return prevData.filter(row => row.key !== selectedRowForDelete?.key);
    });
    // API CALL FOR DELETING PERSON/COMPANY
    deleteValues(deleteEndpoint, selectedRowForDelete?.ID);

    setIsDeleteModalOpen(false);
  };

  return (
    <React.Fragment>
      <Table
        dataSource={tableData}
        columns={columns}
        className="custom-footer-table"
        // scroll={{ x: 2000 }}
        loading={loading}
      />
      <Modal
        title="ویرایش اطلاعات"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
        closable={!isCopied}
        maskClosable={!isCopied}
        width={1000}
      >
        <ModalComponent
          key={selectedRowForEdit?.key || 'new'}
          initialValues={selectedRowForEdit || {}}
          onSubmit={handleUpdate}
          showButton={true}
          isCopied={isCopied}
          setGroupValue={setGroupValue}
          groupValue={groupValue}
        />
      </Modal>
      <Modal title="" open={iseDeleteModalOpen} onCancel={() => setIsDeleteModalOpen(false)} onOk={handleOk}>
        <p>آیا از انجام عملیات مطمئنید؟</p>
      </Modal>
    </React.Fragment>
  );
}

export default ListComponent;
