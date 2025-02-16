import type { MyFormOptions } from '@/components/core/form';
import type { CSSProperties } from 'react';

import { CaretRightOutlined } from '@ant-design/icons';
import { faTrashCan, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Collapse, Form, Input, Modal, Select, Table, theme } from 'antd';
import React, { useEffect, useState } from 'react';

import { useLocale } from '@/locales';

import FormLayout from '../layout/form-layout';

function Home() {
  const { token } = theme.useToken();
  const { formatMessage } = useLocale();
  const nextKeyRef = React.useRef(1);
  const [activeRowKey, setActiveRowKey] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm] = Form.useForm();

  const handleModalFormSubmit = (values: any) => {
    console.log('Modal form submitted (unused):', values);
  };

  const handleOk = async () => {
    try {
      const values = await modalForm.validateFields();

      setTableData(prevData =>
        prevData.map(row => {
          if (row.key === activeRowKey) {
            const updatedRow = { ...row, modalValues: { ...values } };
            const qty = parseFloat(updatedRow.qty) || 0;
            const unitCost = parseFloat(updatedRow.unitCost) || 0;
            const corrActCost = parseFloat(updatedRow.corrActCost) || 0;
            const totalPriceWithoutFactors = corrActCost + qty * unitCost;

            const profitMargin = Number(updatedRow.modalValues['record-profit-margin'] || 0);
            const percentageDiscount = Number(updatedRow.modalValues['record-percentage-discount'] || 0);
            const commute = Number(updatedRow.modalValues['record-commute'] || 0);
            const amountDiscount = Number(updatedRow.modalValues['record-amount-discount'] || 0);
            const recordProfitMargin = (profitMargin / 100) * totalPriceWithoutFactors;
            const recordPercentageDiscount = (percentageDiscount / 100) * totalPriceWithoutFactors;
            const factorsValue = commute + amountDiscount + recordProfitMargin + recordPercentageDiscount;

            updatedRow.factor = factorsValue;
            updatedRow.incFactors = recordPercentageDiscount + amountDiscount;

            updatedRow.totalPriceWithoutFactors = totalPriceWithoutFactors;
            updatedRow.totalPriceWithFactors =
              recordProfitMargin + commute + totalPriceWithoutFactors - amountDiscount - recordPercentageDiscount;

            return updatedRow;
          }

          return row;
        }),
      );
      setIsModalOpen(false);
      modalForm.resetFields();
      setActiveRowKey(null);
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    modalForm.resetFields();
    setActiveRowKey(null);
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
      modalValues: {
        'record-profit-margin': 0,
        'record-percentage-discount': 0,
        'record-commute': 0,
        'record-amount-discount': 0,
      },
      factor: '',
      incFactors: 0,
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

  const showModal = (rowKey: number) => {
    setActiveRowKey(rowKey);
    setIsModalOpen(true);
    const row = tableData.find(r => r.key === rowKey);

    if (row && row.modalValues) {
      modalForm.setFieldsValue(row.modalValues);
    } else {
      modalForm.resetFields();
    }
  };

  const handleCellChange = (value: string, key: string, dataIndex: string) => {
    setTableData(prevData => {
      const newData = prevData.map(row => {
        if (row.key === key) {
          const updatedRow = { ...row, [dataIndex]: value };

          if (
            dataIndex === 'qty' ||
            dataIndex === 'unitCost' ||
            dataIndex === 'corrActCost' ||
            dataIndex === 'factorValue'
          ) {
            const qty = parseFloat(updatedRow.qty) || 0;
            const unitCost = parseFloat(updatedRow.unitCost) || 0;
            const corrActCost = parseFloat(updatedRow.corrActCost) || 0;

            updatedRow.totalPriceWithoutFactors = corrActCost + qty * unitCost;
            const {
              'record-profit-margin': profitMargin = 0,
              'record-percentage-discount': percentageDiscount = 0,
              'record-commute': commute = 0,
              'record-amount-discount': amountDiscount = 0,
            } = updatedRow.modalValues || {};
            const recordProfitMargin = (Number(profitMargin) / 100) * updatedRow.totalPriceWithoutFactors;
            const recordPercentageDiscount = (Number(percentageDiscount) / 100) * updatedRow.totalPriceWithoutFactors;

            updatedRow.totalPriceWithFactors =
              recordProfitMargin +
              Number(commute) +
              updatedRow.totalPriceWithoutFactors -
              Number(amountDiscount) -
              recordPercentageDiscount;
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
      width: 50,
      render: (text: string) => text,
    },
    {
      title: `${formatMessage({ id: 'app.home.detailInfo.table.requirements' })}`,
      dataIndex: 'requirements',
      key: 'requirements',
      width: 200,
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
      width: 200,
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
      width: 200,
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
      width: 200,
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
      width: 100,
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
      width: 120,
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
      width: 120,
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
      render: (text: string, record: any) => (
        <div>
          <FontAwesomeIcon
            icon={faUpRightFromSquare}
            onClick={() => showModal(record.key)}
            style={{ cursor: 'pointer' }}
          />
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
      dataIndex: 'totalPriceWithFactors',
      key: 'totalPriceWithFactors',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: `${formatMessage({ id: 'app.home.detailInfo.table.factor' })}`,
      dataIndex: 'factor',
      key: 'factor',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: `${formatMessage({ id: 'app.home.detailInfo.table.actions' })}`,
      dataIndex: 'actions',
      key: 'actions',
      render: (_: any, record: any) => {
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
            submitForm={() => console.log('')}
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
          <Table
            dataSource={tableData}
            columns={columns}
            pagination={false}
            rowClassName="editable-row"
            footer={() => {
              const totalQty = tableData.reduce((sum, row) => sum + (parseFloat(row.qty) || 0), 0);
              const totalCostWithout = tableData.reduce(
                (sum, row) => sum + (parseFloat(row.totalPriceWithoutFactors) || 0),
                0,
              );
              const totalCostWith = tableData.reduce(
                (sum, row) => sum + (parseFloat(row.totalPriceWithFactors) || 0),
                0,
              );
              const totalIncremented = tableData.reduce((sum, row) => sum + (parseFloat(row.incFactors) || 0), 0);

              return (
                <div style={{ textAlign: 'left', paddingRight: '1rem' }}>
                  <strong>
                    Total Incremented: {totalIncremented} |Total Qty: {totalQty} | Total Cost Without Factors:{' '}
                    {totalCostWithout} | Total Cost With Factors: {totalCostWith}
                  </strong>
                </div>
              );
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="primary">{formatMessage({ id: 'app.home.submissionBtn' })}</Button>
          </div>
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
