import type { MyFormOptions } from '@/components/core/form';
import type { CSSProperties } from 'react';

import { CaretRightOutlined } from '@ant-design/icons';
import { faTrashCan, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Collapse, Form, Input, Modal, Select, Table, theme } from 'antd';
import React, { useEffect, useState } from 'react';

import { useLocale } from '@/locales';

import FormLayout from '../layout/form-layout';

function Home() {
  const { token } = theme.useToken();
  const { formatMessage } = useLocale();
  const nextKeyRef = React.useRef(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFormValues, setModalFormValues] = useState({});
  const [modalForm] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await modalForm.validateFields();
      setModalFormValues(values);
      console.log('Modal Form Values:', values);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleModalFormSubmit = (values: any) => {
    setModalFormValues({ ...values });
    console.log('Modal Form Submitted: ', values);
  };

  const createEmptyRow = () => {
    const newRow = {
      key: nextKeyRef.current,
      category: '',
      requirements: '',
      supplier: '',
      correctiveAction: '',
      qty: '',
      unitCost: '',
      corrActCost: '',
      totalPriceWithFactors: '',
      totalPriceWithoutFactors: '',
      description: '',
      factorValue: '',
    };

    nextKeyRef.current++;

    return newRow;
  };

  const isRowFilled = (row: any) => {
    const requiredFields = [
      'requirements',
      'category',
      'supplier',
      'correctiveAction',
      'qty',
      'unitCost',
      'corrActCost',
    ];

    return requiredFields.every(field => {
      const value = row[field];

      return value !== undefined && value !== null && value.toString().trim() !== '';
    });
  };

  const [tableData, setTableData] = useState<any[]>([createEmptyRow()]);

  const handleCellChange = (value: string, key: string, dataIndex: string) => {
    setTableData(prevData => {
      const newData = prevData.map(row => {
        if (row.key === key) {
          const updatedRow = { ...row, [dataIndex]: value };

          if (dataIndex === 'qty' || dataIndex === 'unitCost' || dataIndex === 'corrActCost') {
            const qty = parseFloat(updatedRow.qty) || 0;
            const unitCost = parseFloat(updatedRow.unitCost) || 0;
            const corrActCost = parseFloat(updatedRow.corrActCost) || 0;

            updatedRow.totalPriceWithoutFactors = corrActCost + qty * unitCost;
          }

          return updatedRow;
        }

        return row;
      });

      return newData;
    });
  };

  useEffect(() => {
    const lastRow = tableData[tableData.length - 1];

    if (lastRow && isRowFilled(lastRow)) {
      setTableData(prevData => [...prevData, createEmptyRow()]);
    }
  }, [tableData]);

  const deleteRow = (key: string) => {
    setTableData(prevData => {
      const rowToDelete = prevData.find(row => row.key === key);

      if (rowToDelete && prevData[0].key === rowToDelete.key && !isRowFilled(rowToDelete)) {
        return prevData;
      }

      return prevData.filter(row => row.key !== key);
    });
  };

  const columns = [
    {
      title: `${formatMessage({ id: 'app.home.detailInfo.table.row' })}`,
      dataIndex: 'key',
      key: 'key',
      render: (text: string) => text,
    },
    {
      title: `${formatMessage({ id: 'app.home.detailInfo.table.requirements' })}`,
      dataIndex: 'requirements',
      key: 'requirements',
      render: (text: string, record: any) => (
        <Select
          value={text}
          placeholder="Select requirement"
          onChange={value => handleCellChange(value, record.key, 'requirements')}
          options={[
            { label: 'Requirement 1', value: 'req1' },
            { label: 'Requirement 2', value: 'req2' },
          ]}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: `${formatMessage({ id: 'app.home.detailInfo.table.category' })}`,
      dataIndex: 'category',
      key: 'category',
      render: (text: string, record: any) => (
        <Select
          value={text}
          placeholder="Select category"
          onChange={value => handleCellChange(value, record.key, 'category')}
          options={[
            { label: 'category 1', value: 'category1' },
            { label: 'category 2', value: 'category2' },
          ]}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: `${formatMessage({ id: 'app.home.detailInfo.table.supplier' })}`,
      dataIndex: 'supplier',
      key: 'supplier',
      render: (text: string, record: any) => (
        <Select
          value={text}
          placeholder="Select supplier"
          onChange={value => handleCellChange(value, record.key, 'supplier')}
          options={[
            { label: 'supplier 1', value: 'supplier1' },
            { label: 'supplier 2', value: 'supplier2' },
          ]}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: `${formatMessage({ id: 'app.home.detailInfo.table.correctiveAction' })}`,
      dataIndex: 'correctiveAction',
      key: 'correctiveAction',
      render: (text: string, record: any) => (
        <Select
          value={text}
          placeholder="Select corrective action"
          onChange={value => handleCellChange(value, record.key, 'correctiveAction')}
          options={[
            { label: 'corrective action 1', value: 'corrective action1' },
            { label: 'corrective action 2', value: 'corrective action2' },
          ]}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: `${formatMessage({ id: 'app.home.detailInfo.table.qty' })}`,
      dataIndex: 'qty',
      key: 'qty',
      render: (text: string, record: any) => (
        <Input
          value={text}
          placeholder="Enter quantity"
          type="number"
          onChange={e => handleCellChange(e.target.value, record.key, 'qty')}
        />
      ),
    },
    {
      title: `${formatMessage({ id: 'app.home.detailInfo.table.unitCost' })}`,
      dataIndex: 'unitCost',
      key: 'unitCost',
      render: (text: string, record: any) => (
        <Input
          value={text}
          placeholder="Enter cost"
          type="number"
          onChange={e => handleCellChange(e.target.value, record.key, 'unitCost')}
        />
      ),
    },
    {
      title: `${formatMessage({ id: 'app.home.detailInfo.table.corrActCost' })}`,
      dataIndex: 'corrActCost',
      key: 'corrActCost',
      render: (text: string, record: any) => (
        <Input
          value={text}
          placeholder="Enter corrective action cost"
          type="number"
          onChange={e => handleCellChange(e.target.value, record.key, 'corrActCost')}
        />
      ),
    },
    {
      title: `${formatMessage({ id: 'app.home.detailInfo.table.factorValue' })}`,
      dataIndex: 'factorValue',
      key: 'factorValue',
      render: () => (
        <div>
          <FontAwesomeIcon icon={faUpRightFromSquare} onClick={showModal} />
          <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <FormLayout
              form={modalForm}
              FormOptions={modalFormOptions}
              isGrid={true}
              layoutDir="vertical"
              showButton={false}
              submitForm={handleModalFormSubmit}
            />
          </Modal>
          ;
        </div>
      ),
    },
    {
      title: `${formatMessage({ id: 'app.home.detailInfo.table.price' })}`,
      dataIndex: 'totalPriceWithoutFactors',
      key: 'totalPriceWithoutFactors',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: `${formatMessage({ id: 'app.home.detailInfo.table.totalPrice' })}`,
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: `${formatMessage({ id: 'app.home.detailInfo.table.actions' })}`,
      dataIndex: 'actions',
      key: 'actions',
      render: (_: any, record: any) => {
        // Disable deletion on first row if it's not filled.
        const isDisabled = record.key === tableData[0].key && !isRowFilled(record);

        return (
          <div>
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={() => {
                if (!isDisabled) {
                  deleteRow(record.key);
                }
              }}
              style={{
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                marginRight: 8,
                opacity: isDisabled ? 0.4 : 1,
              }}
            />
          </div>
        );
      },
    },
  ];

  const modalFormOptions: MyFormOptions = [
    {
      name: 'record-profit-margin',
      label: `${formatMessage({ id: 'app.home.detailInfo.table.modalForm.profitMargin' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'record-percentage-discount',
      label: `${formatMessage({ id: 'app.home.detailInfo.table.modalForm.percentageDiscount' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'record-commute',
      label: `${formatMessage({ id: 'app.home.detailInfo.table.modalForm.commute' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'record-amount-discount',
      label: `${formatMessage({ id: 'app.home.detailInfo.table.modalForm.amountDiscount' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
  ];
  const proformaFormOptions: MyFormOptions = [
    {
      name: 'header-info-title',
      label: `${formatMessage({ id: 'app.home.headerInfo.title' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'header-info-costumer',
      label: `${formatMessage({ id: 'app.home.headerInfo.costumer' })}`,
      type: 'select',
      innerProps: { placeholder: '' },
      options: [
        { label: 'مشتری یک', value: '1' },
        { label: 'مشتری دو', value: '2' },
      ],
    },
    {
      name: 'header-info-date',
      label: `${formatMessage({ id: 'app.home.headerInfo.date' })}`,
      type: 'date-picker',
      innerProps: { placeholder: '' },
    },
    {
      name: 'header-info-desc',
      label: `${formatMessage({ id: 'app.home.headerInfo.desc' })}`,
      type: 'textarea',
      innerProps: { placeholder: '' },
    },
  ];

  const panelStyle: CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
    fontWeight: 600,
  };

  const getItems = (panelStyle: CSSProperties) => [
    {
      key: '1',
      label: `${formatMessage({ id: 'app.home.headerInfo' })}`,
      children: (
        <div>
          <FormLayout
            FormOptions={proformaFormOptions}
            layoutDir="vertical"
            isGrid={true}
            submitForm={() => console.log('first')}
          />
        </div>
      ),
      style: panelStyle,
    },
    {
      key: '2',
      label: `${formatMessage({ id: 'app.home.detailInfo' })}`,
      children: (
        <div>
          <Table dataSource={tableData} columns={columns} pagination={false} rowClassName="editable-row" />
        </div>
      ),
      style: panelStyle,
    },
  ];

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      style={{ background: token.colorBgContainer }}
    >
      {getItems(panelStyle).map((item: any) => (
        <Collapse.Panel key={item.key} header={item.label} style={item.style}>
          {item.children}
        </Collapse.Panel>
      ))}
    </Collapse>
  );
}

export default Home;

// import type { MyFormOptions } from '@/components/core/form';
// import type { CollapseProps } from 'antd';
// import type { CSSProperties } from 'react';

// import './index.css';

// import { CaretRightOutlined } from '@ant-design/icons';
// import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Collapse, Table, theme } from 'antd';
// import React, { useState } from 'react';

// import { useLocale } from '@/locales';

// import FormLayout from '../layout/form-layout';

// function Home() {
//   const { token } = theme.useToken();
//   const { formatMessage } = useLocale();

//   const [tableData, setTableData] = useState<any[]>([]);

//   const handleSubmit = (values: any) => {
//     // Transform form values to match the table columns
//     const newRow = {
//       index: Date.now(),
//       requirements: values['detail-info-requirements'] || '',
//       category: values['detail-info-category'] || '',
//       supplier: values['detail-info-supplier'] || '',
//       correctiveAction: values['detail-info-corrective-action'] || '',
//       qty: values['detail-info-qty'] || '',
//       reqCost: values['detail-info-cost'] || '',
//       // unitCost: values['detail-info-unitCost'] || '',
//       // actionCost: values['detail-info-actionCost'] || '',
//       totalPrice: values['detail-info-qty'] * values['detail-info-cost'] + values['detail-info-actionCost'],
//       actions: (
//         <div>
//           <FontAwesomeIcon icon={faTrashCan} />
//           <FontAwesomeIcon icon={faEdit} />
//         </div>
//       ),
//       // ... include other mappings as needed
//     };

//     setTableData(prevData => [...prevData, newRow]);
//   };

//   const proformaFormOptions: MyFormOptions = [
//     {
//       name: 'header-info-title',
//       label: `${formatMessage({ id: 'app.home.headerInfo.title' })}`,
//       type: 'input',
//       innerProps: { placeholder: '' },
//     },
//     {
//       name: 'header-info-costumer',
//       label: `${formatMessage({ id: 'app.home.headerInfo.costumer' })}`,
//       type: 'select',
//       innerProps: { placeholder: '' },
//       options: [
//         { label: 'مشتری یک', value: '1' },
//         { label: 'مشتری دو', value: '2' },
//       ],
//     },
//     {
//       name: 'header-info-date',
//       label: `${formatMessage({ id: 'app.home.headerInfo.date' })}`,
//       type: 'date-picker',
//       innerProps: { placeholder: '' },
//     },
//     {
//       name: 'header-info-desc',
//       label: `${formatMessage({ id: 'app.home.headerInfo.desc' })}`,
//       type: 'textarea',
//       innerProps: { placeholder: '' },
//     },
//     {
//       name: 'detail-info-category',
//       label: `${formatMessage({ id: 'app.home.detailInfo.category' })}`,
//       type: 'select',
//       innerProps: { placeholder: '' },
//       options: [
//         { label: 'بخش یک', value: '1' },
//         { label: 'بخش دو', value: '2' },
//       ],
//     },
//     {
//       name: 'detail-info-supplier',
//       label: `${formatMessage({ id: 'app.home.detailInfo.supplier' })}`,
//       type: 'select',
//       innerProps: { placeholder: '' },
//       options: [
//         { label: 'خدمات دهنده یک', value: '1' },
//         { label: 'خدمات دهنده دو', value: '2' },
//       ],
//     },
//     {
//       name: 'detail-info-corrective-action',
//       label: `${formatMessage({ id: 'app.home.detailInfo.corrective' })}`,
//       type: 'select',
//       innerProps: { placeholder: '' },
//       options: [
//         { label: 'عملیات یک', value: '1' },
//         { label: 'عملیات دو', value: '2' },
//       ],
//     },
//     {
//       name: 'detail-info-desc',
//       label: `${formatMessage({ id: 'app.home.detailInfo.desc' })}`,
//       type: 'textarea',
//       innerProps: { placeholder: '' },
//     },
//     {
//       name: 'detail-info-cost',
//       label: `${formatMessage({ id: 'app.home.detailInfo.cost' })}`,
//       type: 'input',
//       innerProps: { placeholder: '' },
//     },
//     {
//       name: 'detail-info-requirements',
//       label: `${formatMessage({ id: 'app.home.detailInfo.requirements' })}`,
//       type: 'select',
//       innerProps: { placeholder: '' },
//       options: [
//         { label: 'نیاز یک', value: '1' },
//         { label: 'نیاز دو', value: '2' },
//       ],
//     },
//     {
//       name: 'detail-info-qty',
//       label: `${formatMessage({ id: 'app.home.detailInfo.qty' })}`,
//       type: 'input',
//       innerProps: { placeholder: '' },
//     },
//     {
//       name: 'detail-info-unitCost',
//       label: `${formatMessage({ id: 'app.home.detailInfo.unitCost' })}`,
//       type: 'input',
//       innerProps: { placeholder: '' },
//     },
//     {
//       name: 'detail-info-actionCost',
//       label: `${formatMessage({ id: 'app.home.detailInfo.actionCost' })}`,
//       type: 'input',
//       innerProps: { placeholder: '' },
//     },
//     {
//       name: 'detail-info-reducing',
//       label: `${formatMessage({ id: 'app.home.detailInfo.reduce' })}`,
//       type: 'input',
//       innerProps: { placeholder: '' },
//     },
//     {
//       name: 'detail-info-increasing',
//       label: `${formatMessage({ id: 'app.home.detailInfo.increase' })}`,
//       type: 'input',
//       innerProps: { placeholder: '' },
//     },
//     {
//       name: 'detail-info-finalCost',
//       label: `${formatMessage({ id: 'app.home.detailInfo.finalCost' })}`,
//       type: 'input',
//       innerProps: { placeholder: '' },
//     },
//     // {
//     //   name: 'incDec-factor',
//     //   label: '',
//     //   type: 'radio',
//     //   options: [
//     //     { label: 'تخفیف درصدی', value: 'percentage discount' },
//     //     { label: '10 درصد مالیات ارزش افزوده', value: 'tax' },
//     //     { label: 'ایاب ذهاب', value: 'commute' },
//     //     { label: 'تخفیف مبلغی', value: 'price discount' },
//     //   ],
//     // },
//     {
//       name: 'incDec-percentage-discount',
//       label: `${formatMessage({ id: 'app.home.incDecInfo.percDiscount' })}`,
//       type: 'input',
//       innerProps: { placeholder: '' },
//     },
//     {
//       name: 'incDec-tax',
//       label: `${formatMessage({ id: 'app.home.incDecInfo.tax' })}`,
//       type: 'input',
//       innerProps: { placeholder: '' },
//     },
//     {
//       name: 'incDec-commute',
//       label: `${formatMessage({ id: 'app.home.incDecInfo.commute' })}`,
//       type: 'input',
//       innerProps: { placeholder: '' },
//     },
//     {
//       name: 'incDec-price-discount',
//       label: `${formatMessage({ id: 'app.home.incDecInfo.priceDiscount' })}`,
//       type: 'input',
//       innerProps: { placeholder: '' },
//     },
//   ];

//   const getItems: (panelStyle: CSSProperties) => CollapseProps[] = panelStyle => [
//     {
//       key: '1',
//       label: `${formatMessage({ id: 'app.home.headerInfo' })}`,
//       children: (
//         <div>
//           <FormLayout FormOptions={proformaFormOptions} layoutDir="vertical" isGrid={true} submitForm={handleSubmit} />
//         </div>
//       ),
//       style: panelStyle,
//     },
//     {
//       key: '2',
//       label: `${formatMessage({ id: 'app.home.detailInfo' })}`,
//       children: (
//         <div>
//           <Table dataSource={tableData} columns={columns} />
//         </div>
//       ),
//       style: panelStyle,
//     },
//   ];

//   const panelStyle: React.CSSProperties = {
//     marginBottom: 24,
//     background: token.colorFillAlter,
//     borderRadius: token.borderRadiusLG,
//     border: 'none',
//     fontWeight: 600,
//   };

//   const columns = [
//     {
//       title: `${formatMessage({ id: 'app.home.detailInfo.table.row' })}`,
//       dataIndex: 'index',
//       key: 'index',
//     },
//     {
//       title: `${formatMessage({ id: 'app.home.detailInfo.table.requirements' })}`,
//       dataIndex: 'requirements',
//       key: 'requirements',
//     },
//     {
//       title: `${formatMessage({ id: 'app.home.detailInfo.table.category' })}`,
//       dataIndex: 'category',
//       key: 'category',
//     },
//     {
//       title: `${formatMessage({ id: 'app.home.detailInfo.table.supplier' })}`,
//       dataIndex: 'supplier',
//       key: 'supplier',
//     },
//     {
//       title: `${formatMessage({ id: 'app.home.detailInfo.table.correctiveAction' })}`,
//       dataIndex: 'correctiveAction',
//       key: 'correctiveAction',
//     },
//     {
//       title: `${formatMessage({ id: 'app.home.detailInfo.table.qty' })}`,
//       dataIndex: 'qty',
//       key: 'qty',
//     },
//     {
//       title: `${formatMessage({ id: 'app.home.detailInfo.table.reqCost' })}`,
//       dataIndex: 'reqCost',
//       key: 'reqCost',
//     },
//     {
//       title: `${formatMessage({ id: 'app.home.detailInfo.table.corrActCost' })}`,
//       dataIndex: 'corrActCost',
//       key: 'corrActCost',
//     },
//     {
//       title: `${formatMessage({ id: 'app.home.detailInfo.table.price' })}`,
//       dataIndex: 'price',
//       key: 'price',
//     },
//     {
//       title: `${formatMessage({ id: 'app.home.detailInfo.table.red' })}`,
//       dataIndex: 'red',
//       key: 'red',
//     },
//     {
//       title: `${formatMessage({ id: 'app.home.detailInfo.table.inc' })}`,
//       dataIndex: 'inc',
//       key: 'inc',
//     },
//     {
//       title: `${formatMessage({ id: 'app.home.detailInfo.table.totalPrice' })}`,
//       dataIndex: 'totalPrice',
//       key: 'totalPrice',
//     },
//     {
//       title: `${formatMessage({ id: 'app.home.detailInfo.table.actions' })}`,
//       dataIndex: 'actions',
//       key: 'actions',
//     },
//   ];

//   return (
//     <Collapse
//       bordered={false}
//       defaultActiveKey={['1']}
//       expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
//       style={{ background: token.colorBgContainer }}
//     >
//       {getItems(panelStyle).map((item: any) => (
//         <Collapse.Panel key={item.key} header={item.label} style={item.style}>
//           {item.children}
//         </Collapse.Panel>
//       ))}
//     </Collapse>
//   );
// }

// export default Home;
