import type { MyFormOptions } from '@/components/core/form';
import type { CollapseProps } from 'antd';
import type { CSSProperties } from 'react';

import './index.css';

import { CaretRightOutlined } from '@ant-design/icons';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Collapse, Table, theme, Input } from 'antd';
import React, { useState } from 'react';

import { useLocale } from '@/locales';

import FormLayout from '../layout/form-layout';

function Home() {
  const { token } = theme.useToken();
  const { formatMessage } = useLocale();

  // ------------------------------
  // Editable Table Helpers
  // ------------------------------

  // Function to create a new empty row for the detail info table.
  const createEmptyRow = () => ({
    key: Date.now().toString(),
    // The following keys match your table columns.
    requirements: '',
    category: '',
    supplier: '',
    correctiveAction: '',
    qty: '',
    reqCost: '',
    totalPrice: '',
  });

  // Check if the row is considered “filled in” by verifying that each required field is non‑empty.
  const isRowFilled = (row: any) => {
    // Adjust this check to include any fields you consider required.
    return row.requirements && row.category && row.supplier && row.correctiveAction && row.qty && row.reqCost;
  };

  // Initialize the table with one empty row.
  const [tableData, setTableData] = useState<any[]>([createEmptyRow()]);

  // Update a specific cell’s value.
  const handleCellChange = (value: string, key: string, dataIndex: string) => {
    setTableData(prevData => {
      const newData = prevData.map(row => {
        if (row.key === key) {
          const updatedRow = { ...row, [dataIndex]: value };

          // If quantity or cost changes, recalculate the total price.
          if (dataIndex === 'qty' || dataIndex === 'reqCost') {
            const qty = parseFloat(updatedRow.qty) || 0;
            const reqCost = parseFloat(updatedRow.reqCost) || 0;
            updatedRow.totalPrice = qty * reqCost;
          }
          return updatedRow;
        }
        return row;
      });

      // If the last row is completely filled, add a new empty row.
      const lastRow = newData[newData.length - 1];
      if (isRowFilled(lastRow)) {
        newData.push(createEmptyRow());
      }
      return newData;
    });
  };

  // Remove a row (for example, when the trash icon is clicked).
  const deleteRow = (key: string) => {
    setTableData(prevData => prevData.filter(row => row.key !== key));
  };

  // ------------------------------
  // Table Column Definitions
  // ------------------------------

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
        <Input
          value={text}
          placeholder="Enter requirements"
          onChange={e => handleCellChange(e.target.value, record.key, 'requirements')}
        />
      ),
    },
    {
      title: `${formatMessage({ id: 'app.home.detailInfo.table.category' })}`,
      dataIndex: 'category',
      key: 'category',
      render: (text: string, record: any) => (
        <Input
          value={text}
          placeholder="Enter category"
          onChange={e => handleCellChange(e.target.value, record.key, 'category')}
        />
      ),
    },
    {
      title: `${formatMessage({ id: 'app.home.detailInfo.table.supplier' })}`,
      dataIndex: 'supplier',
      key: 'supplier',
      render: (text: string, record: any) => (
        <Input
          value={text}
          placeholder="Enter supplier"
          onChange={e => handleCellChange(e.target.value, record.key, 'supplier')}
        />
      ),
    },
    {
      title: `${formatMessage({ id: 'app.home.detailInfo.table.correctiveAction' })}`,
      dataIndex: 'correctiveAction',
      key: 'correctiveAction',
      render: (text: string, record: any) => (
        <Input
          value={text}
          placeholder="Enter corrective action"
          onChange={e => handleCellChange(e.target.value, record.key, 'correctiveAction')}
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
      title: `${formatMessage({ id: 'app.home.detailInfo.table.reqCost' })}`,
      dataIndex: 'reqCost',
      key: 'reqCost',
      render: (text: string, record: any) => (
        <Input
          value={text}
          placeholder="Enter cost"
          type="number"
          onChange={e => handleCellChange(e.target.value, record.key, 'reqCost')}
        />
      ),
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
      render: (_: any, record: any) => (
        <div>
          <FontAwesomeIcon
            icon={faTrashCan}
            onClick={() => deleteRow(record.key)}
            style={{ cursor: 'pointer', marginRight: 8 }}
          />
          <FontAwesomeIcon icon={faEdit} style={{ cursor: 'pointer' }} />
        </div>
      ),
    },
  ];

  // ------------------------------
  // Header Form Options (Unchanged)
  // ------------------------------

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

  // ------------------------------
  // Collapse Panels Definition
  // ------------------------------

  const getItems: (panelStyle: CSSProperties) => CollapseProps[] = panelStyle => [
    {
      key: '1',
      label: `${formatMessage({ id: 'app.home.headerInfo' })}`,
      children: (
        <div>
          <FormLayout
            FormOptions={proformaFormOptions}
            layoutDir="vertical"
            isGrid={true}
            submitForm={values => console.log(values)}
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

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
    fontWeight: 600,
  };

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
