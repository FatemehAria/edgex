import type { MyFormOptions } from '@/components/core/form';
import type { CSSProperties } from 'react';

import { CaretRightOutlined } from '@ant-design/icons';
import { faTrashCan, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AutoComplete, Button, Collapse, Form, Input, Modal, Select, Table, theme } from 'antd';
import { useEffect, useState } from 'react';

import { useLocale } from '@/locales';

import FormLayout from '../layout/form-layout';

function Home() {
  const { token } = theme.useToken();
  const { formatMessage } = useLocale();
  const [nextKey, setNextKey] = useState(2);

  const [tableData, setTableData] = useState<any[]>([
    {
      key: 1,
      category: '',
      supplier: '',
      recordProfitMargin: 0,
      primarySalesPrice: '',
      itemTotalPrice: '',
      totalPriceWithoutFactors: '',
      qty: '',
      unitCost: '',
      totalPriceWithFactors: '',
      description: '',
      factorValue: '',
      modalValues: {
        'record-percentage-discount': 0,
        'record-commute': 0,
        'record-amount-discount': 0,
      },
      factor: '',
      decFactors: 0,
      incFactors: 0,
    },
  ]);

  const [modalForm] = Form.useForm();
  const [activeRowKey, setActiveRowKey] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalFormSubmit = (values: any) => {
    console.log('Modal form submitted (unused):', values);
  };

  const createEmptyRow = () => {
    const newRow = {
      key: nextKey,
      category: '',
      items: '',
      supplier: '',
      recordProfitMargin: 0,
      primarySalesPrice: '',
      itemTotalPrice: '',
      qty: '',
      unitCost: '',
      totalPriceWithFactors: '',
      totalPriceWithoutFactors: '',
      description: '',
      factorValue: '',
      modalValues: {
        'record-percentage-discount': 0,
        'record-commute': 0,
        'record-amount-discount': 0,
      },
      factor: '',
      decFactors: 0,
      incFactors: 0,
    };

    setNextKey(prev => prev + 1);

    return newRow;
  };

  const isRowFilled = (row: any) => {
    const requiredFields = ['category', 'supplier', 'qty', 'unitCost'];

    return requiredFields.every(field => {
      const value = row[field];

      return value !== undefined && value !== null && value.toString().trim() !== '';
    });
  };

  const handleCellChange = (value: string, key: string, dataIndex: string) => {
    setTableData(prevData =>
      prevData.map(row => {
        if (row.key === key) {
          const updatedRow = { ...row, [dataIndex]: value };

          if (dataIndex === 'qty' || dataIndex === 'unitCost' || dataIndex === 'factorValue') {
            const qty = parseFloat(updatedRow.qty) || 0;
            const unitCost = parseFloat(updatedRow.unitCost) || 0;

            // هزینه کل
            updatedRow.totalPriceWithoutFactors = qty * unitCost;

            const {
              'record-percentage-discount': percentageDiscount = 0,
              'record-commute': commute = 0,
              'record-amount-discount': amountDiscount = 0,
            } = updatedRow.modalValues || {};

            // قیمت فروش اولیه
            const primarySalesPrice =
              Number(updatedRow.recordProfitMargin) * updatedRow.unitCost + Number(updatedRow.unitCost);

            updatedRow.primarySalesPrice = primarySalesPrice;

            // قیمت کل آیتم
            const itemTotalPrice = primarySalesPrice * Number(updatedRow.qty);

            updatedRow.itemTotalPrice = itemTotalPrice;

            const recordPercentageDiscount = (Number(percentageDiscount) / 100) * updatedRow.totalPriceWithoutFactors;

            updatedRow.totalPriceWithFactors =
              primarySalesPrice +
              Number(commute) +
              updatedRow.totalPriceWithoutFactors -
              Number(amountDiscount) -
              recordPercentageDiscount;
          }

          return updatedRow;
        }

        return row;
      }),
    );
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

  const handleOk = async () => {
    try {
      const values = await modalForm.validateFields();

      setTableData(prevData =>
        prevData.map(row => {
          if (row.key === activeRowKey) {
            const updatedRow = { ...row, modalValues: { ...values } };
            const qty = parseFloat(updatedRow.qty) || 0;
            const unitCost = parseFloat(updatedRow.unitCost) || 0;

            // هزینه کل
            const totalPriceWithoutFactors = qty * unitCost;

            updatedRow.totalPriceWithoutFactors = totalPriceWithoutFactors;

            const percentageDiscount = Number(values['record-percentage-discount'] || 0);
            const commute = Number(values['record-commute'] || 0);
            const amountDiscount = Number(values['record-amount-discount'] || 0);
            // قیمت فروش اولیه
            const primarySalesPrice =
              Number(updatedRow.recordProfitMargin * updatedRow.unitCost) + Number(updatedRow.unitCost);

            updatedRow.primarySalesPrice = primarySalesPrice;

            // قیمت کل آیتم
            const itemTotalPrice = primarySalesPrice * Number(updatedRow.qty);

            updatedRow.itemTotalPrice = itemTotalPrice;

            const recordPercentageDiscount = (percentageDiscount / 100) * totalPriceWithoutFactors;

            updatedRow.totalPriceWithFactors =
              primarySalesPrice + commute + totalPriceWithoutFactors - amountDiscount - recordPercentageDiscount;

            updatedRow.factor = commute + amountDiscount + primarySalesPrice + recordPercentageDiscount;
            updatedRow.decFactors = recordPercentageDiscount + amountDiscount;
            updatedRow.incFactors = commute + primarySalesPrice;

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

  const columns = [
    {
      title: `${formatMessage({ id: 'app.home.detailInfo.table.row' })}`,
      dataIndex: 'key',
      key: 'key',
      width: 50,
      render: (text: string) => <span>{text}</span>,
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
      title: `${formatMessage({ id: 'app.home.detailInfo.table.items' })}`,
      dataIndex: 'items',
      key: 'items',
      width: 200,
      render: (text: string, record: any) => (
        <Select
          value={text}
          placeholder="Select items"
          onChange={value => handleCellChange(value, record.key, 'items')}
          options={[
            { label: 'items 1', value: 'items1' },
            { label: 'items 2', value: 'items2' },
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
      title: `${formatMessage({ id: 'app.home.detailInfo.table.desc' })}`,
      dataIndex: 'description',
      key: 'description',
      width: 200,
      render: (text: string, record: any) => (
        <Input.TextArea
          value={text}
          placeholder="Enter description"
          onChange={e => handleCellChange(e.target.value, record.key, 'description')}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: `${formatMessage({ id: 'app.home.detailInfo.table.profitPercentage' })}`,
      dataIndex: 'recordProfitMargin',
      key: 'recordProfitMargin',
      width: 200,
      render: (text: string, record: any) => (
        <AutoComplete
          value={text}
          placeholder=""
          onChange={value => handleCellChange(value, record.key, 'recordProfitMargin')}
          options={[{ value: '100' }, { value: '200' }]}
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
          min={0}
        />
      ),
    },
    {
      title: `${formatMessage({ id: 'app.home.detailInfo.table.unitCost' })}`,
      dataIndex: 'unitCost',
      key: 'unitCost',
      width: 120,
      render: (text: string, record: any) => (
        <AutoComplete
          value={text}
          options={[{ value: '100' }, { value: '200' }]}
          placeholder="Enter cost"
          onChange={value => handleCellChange(value, record.key, 'unitCost')}
          style={{ width: '100%' }}
          allowClear
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
      title: `${formatMessage({ id: 'app.home.detailInfo.table.primarySalesPrice' })}`,
      dataIndex: 'primarySalesPrice',
      key: 'primarySalesPrice',
      render: (text: string) => (text ? <span style={{ color: '#36454f' }}>{text}</span> : '-'),
    },
    {
      title: `${formatMessage({ id: 'app.home.detailInfo.table.itemTotalPrice' })}`,
      dataIndex: 'itemTotalPrice',
      key: 'itemTotalPrice',
      render: (text: string) => (text ? <span style={{ color: '#36454f' }}>{text}</span> : '-'),
    },
    {
      title: `${formatMessage({ id: 'app.home.detailInfo.table.price' })}`,
      dataIndex: 'totalPriceWithoutFactors',
      key: 'totalPriceWithoutFactors',
      render: (text: string) => (text ? <span style={{ color: '#36454f' }}>{text}</span> : '-'),
    },
    {
      title: `${formatMessage({ id: 'app.home.detailInfo.table.totalPrice' })}`,
      dataIndex: 'totalPriceWithFactors',
      key: 'totalPriceWithFactors',
      render: (text: string) => (text ? <span style={{ color: '#36454f' }}>{text}</span> : '-'),
    },
    {
      title: `${formatMessage({ id: 'app.home.detailInfo.table.factor' })}`,
      dataIndex: 'factor',
      key: 'factor',
      render: (text: string) => (text ? <span style={{ color: '#36454f' }}>{text}</span> : '-'),
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
      name: 'recordProfitMargin',
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
            scroll={{ x: 1500 }}
            footer={() => {
              const totalQty = tableData.reduce((sum, row) => sum + (parseFloat(row.qty) || 0), 0);
              const totalCostWithout = tableData.reduce(
                (sum, row) => sum + (parseFloat(row.totalPriceWithoutFactors) || 0),
                0,
              );
              const totalCostOfRows = tableData.reduce((sum, row) => sum + (parseFloat(row.itemTotalPrice) || 0), 0);
              const totalDecremented = tableData.reduce((sum, row) => sum + (parseFloat(row.decFactors) || 0), 0);
              const totalIncremented = tableData.reduce((sum, row) => sum + (parseFloat(row.incFactors) || 0), 0);

              return (
                <div
                  style={{
                    textAlign: 'left',
                    paddingRight: '1rem',
                    backgroundColor: '#800000',
                    borderRadius: '5px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      gap: '1rem',
                      color: 'white',
                    }}
                  >
                    <p>
                      {formatMessage({ id: 'app.home.detailInfo.table.footer.totalInc' })}: {totalIncremented}
                    </p>
                    <p>
                      {formatMessage({ id: 'app.home.detailInfo.table.footer.totalDec' })}: {totalDecremented}
                    </p>
                    <p>
                      {formatMessage({ id: 'app.home.detailInfo.table.footer.totalQty' })}: {totalQty}
                    </p>
                    <p>
                      {formatMessage({ id: 'app.home.detailInfo.table.footer.totalCostWithFactors' })}:{' '}
                      {totalCostOfRows}
                    </p>
                    <p>
                      {formatMessage({ id: 'app.home.detailInfo.table.footer.totalCostWithoutFactors' })}:{' '}
                      {totalCostWithout}
                    </p>
                  </div>
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
