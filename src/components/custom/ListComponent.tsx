import { Modal, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react';

import { IsEdittingProformaContext } from '@/pages/home/context/IsEdittingProformaContext';
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
  const { isCopyingProforma, setIsCopyingProforma, proformaStatus, setIsEdittingProforma, isEdittingProforma } =
    useContext(IsEdittingProformaContext);

  const deleteRow = (record: any) => {
    setSelectedRowForDelete(record);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    // API CALL FOR GETTING USERS LIST
    getLists(getListEndpoint, setTableData, setLoading);
  }, []);

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = () => {
    getLists(getListEndpoint, setTableData, setLoading);
  };

  // const handleEdit = (record: any) => {
  //   if (record.StatusTitle === 'صادر شده' || proformaStatus === true) {
  //     return;
  //   }

  //   const rowToEdit = { ...record };

  //   if (!rowToEdit.isCopied) {
  //     rowToEdit.isCopied = false;
  //   }

  //   setIsEdittingProforma && setIsEdittingProforma(true);
  //   setSelectedRowForEdit(rowToEdit);
  //   setIsEditModalOpen(true);
  //   setIsCopied(rowToEdit.isCopied);
  //   setIsCopyingProforma(rowToEdit.isCopied);
  // };

  const handleEdit = (record: any) => {
    // Do not open modal if the proforma is already confirmed
    if (record.StatusTitle === 'صادر شده' || proformaStatus === true) {
      return;
    }

    const rowToEdit = { ...record };

    rowToEdit.isCopied = false;

    setIsEdittingProforma && setIsEdittingProforma(true);

    setIsCopyingProforma(false);
    setSelectedRowForEdit(rowToEdit);
    setIsEditModalOpen(true);
    setIsCopied(false);
  };

  // const copyRow = (record: any) => {
  //   const index = tableData.findIndex(row => row.key === record.key);
  //   const maxKey = tableData.reduce((max, row) => Math.max(max, Number(row.key)), 0);
  //   const newKey = (maxKey + 1).toString();

  //   const newRow = { ...record, key: newKey, isCopied: true };

  //   setTableData(prevData => {
  //     const newData = [...prevData];

  //     newData.splice(index + 1, 0, newRow);

  //     return newData;
  //   });

  //   setSelectedRowForEdit(newRow);
  //   setIsEditModalOpen(true);
  //   setIsCopied(true);
  //   setIsCopyingProforma(true);
  // };

  const copyRow = (record: any) => {
    const index = tableData.findIndex(row => row.key === record.key);
    const maxKey = tableData.reduce((max, row) => Math.max(max, Number(row.key)), 0);
    const newKey = (maxKey + 1).toString();

    const newRow = { ...record, key: newKey, isCopied: true };

    setTableData(prevData => {
      const newData = [...prevData];

      newData.splice(index + 1, 0, newRow);

      return newData;
    });

    // In copy mode, we want the edit modal to open but with copying flags set.
    setSelectedRowForEdit(newRow);
    setIsEditModalOpen(true);
    setIsCopied(true);
    setIsCopyingProforma(true);
    // Also ensure that the generic edit flag is true so modal opens
    setIsEdittingProforma && setIsEdittingProforma(true);
  };

  const columns = columnsComponent({ deleteRow, handleEdit, copyRow, refreshList });

  // const handleUpdate = (updatedData: any) => {
  //   const mergedData = { ...selectedRowForEdit };

  //   Object.keys(updatedData).forEach(key => {
  //     if (updatedData[key] !== '' && updatedData[key] !== null && updatedData[key] !== undefined) {
  //       mergedData[key] = updatedData[key];
  //     }
  //   });

  //   setTableData(prevData => prevData.map(row => (row.key === mergedData.key ? mergedData : row)));

  //   setIsEditModalOpen(false);

  //   const dataToCreate = transformData ? transformData(mergedData) : mergedData;

  //   if (isCopied) {
  //     createListItem(dataToCreate, catId);
  //   } else {
  //     updateValues(updateEndpoint, mergedData, selectedRowForEdit?.ID);
  //   }

  //   setIsCopied(false);
  //   setIsCopyingProforma(false);
  //   setSelectedRowForEdit(null);
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

    const dataToCreate = transformData ? transformData(mergedData) : mergedData;

    // If we are in copy mode, call the create API; otherwise call the update API.
    if (isCopyingProforma) {
      createListItem(dataToCreate, catId);
    } else {
      updateValues(updateEndpoint, mergedData, selectedRowForEdit?.ID);
    }

    // Reset flags after submission.
    setIsCopied(false);
    setIsCopyingProforma(false);
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
        open={isEditModalOpen && (typeof isEdittingProforma === 'boolean' ? isEdittingProforma : true)}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
        closable={!isCopied || !isCopyingProforma}
        maskClosable={!isCopied || !isCopyingProforma}
        width={1000}
        afterClose={() => {
          setIsEdittingProforma(false);
        }}
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
