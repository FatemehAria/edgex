import { Modal, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useLocale } from '@/locales';
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
  const { formatMessage } = useLocale();
  const { locale } = useSelector(state => state.user);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRowForEdit, setSelectedRowForEdit] = useState<any>(null);
  const [tableData, setTableData] = useState<any[]>([]);
  const [iseDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRowForDelete, setSelectedRowForDelete] = useState<any>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const {
    isCopyingProforma,
    setIsCopyingProforma,
    proformaStatus,
    setIsEdittingProforma,
    isEdittingProforma,
    setHeaderData,
  } = useContext(IsEdittingProformaContext);

  const deleteRow = (record: any) => {
    setSelectedRowForDelete(record);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    getLists(getListEndpoint, setTableData, setLoading);
  }, []);

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = () => {
    getLists(getListEndpoint, setTableData, setLoading);
  };

  const handleEdit = (record: any) => {
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

  const updateEditedRow = (field: string, value: any) => {
    setHeaderData((prev: any) => ({ ...prev, [field]: value }));

    if (selectedRowForEdit) {
      setTableData(prevData =>
        prevData.map(row => (row.key === selectedRowForEdit.key ? { ...row, [field]: value } : row)),
      );
    }

    localStorage.setItem(`header-info-${field.toLowerCase()}`, JSON.stringify(value));
  };

  const copyRow = (record: any) => {
    console.log('copy row', record);
    const index = tableData.findIndex(row => row.key === record.key);
    const maxKey = tableData.reduce((max, row) => Math.max(max, Number(row.key)), 0);
    const newKey = (maxKey + 1).toString();

    const newRow = { ...record, key: newKey, isCopied: true };

    setTableData(prevData => {
      const newData = [...prevData];

      newData.splice(index + 1, 0, newRow);

      return newData;
    });

    setSelectedRowForEdit(newRow);
    setIsEditModalOpen(true);
    setIsCopied(true);
    setIsCopyingProforma(true);
    setIsEdittingProforma && setIsEdittingProforma(true);
  };

  const handleCopy = (record: any) => {
    const newRecord = JSON.parse(JSON.stringify(record));

    delete newRecord.ID;
    // added for resetting the StatusTitle in listOfProformaColumns
    newRecord.StatusTitle = '';
    delete newRecord.id;
    delete newRecord.code;
    delete newRecord.Code;

    const maxKey = tableData.reduce((max, row) => Math.max(max, Number(row.key)), 0);
    const newKey = (maxKey + 1).toString();

    newRecord.key = newKey;
    newRecord.isCopied = true;

    setTableData(prevData => {
      const index = prevData.findIndex(row => row.key === record.key);
      const newData = [...prevData];

      newData.splice(index + 1, 0, newRecord);

      return newData;
    });

    setSelectedRowForEdit(newRecord);
    setIsEditModalOpen(true);
    setIsCopied(true);
    setIsCopyingProforma(true);

    setIsEdittingProforma && setIsEdittingProforma(true);

    return newRecord;
  };

  const columns = columnsComponent({ deleteRow, handleEdit, copyRow, refreshList, handleCopy });

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

    if (isCopyingProforma) {
      createListItem(dataToCreate, catId);
    } else {
      updateValues(updateEndpoint, mergedData, selectedRowForEdit?.ID);
    }

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
        pagination={{ position: locale === 'en_US' ? ['bottomLeft'] : ['bottomRight'] }}
      />
      <Modal
        title={formatMessage({ id: 'app.home.listEditModal' })}
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
          updateEditedRow={updateEditedRow}
        />
      </Modal>
      <Modal title="" open={iseDeleteModalOpen} onCancel={() => setIsDeleteModalOpen(false)} onOk={handleOk}>
        <p>{formatMessage({ id: 'app.home.confirmationModal' })}</p>
      </Modal>
    </React.Fragment>
  );
}

export default ListComponent;
