import type { MyFormOptions } from '@/components/core/form';

import { faTrashCan, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AutoComplete, Input, Modal, Select } from 'antd';

import FormLayout from '../layout/form-layout';

const handleModalFormSubmit = (values: any) => {
  console.log('Modal form submitted (unused):', values);
};

export const Columns = (
  formatMessage: (descriptor: any) => string,
  handleCellChange: (value: string, key: string, dataIndex: string) => void,
  showModal: (rowKey: number) => void,
  deleteRow: (key: string) => void,
  tableData: any[],
  isRowFilled: (row: any) => boolean,
  isModalOpen: boolean,
  modalForm: any,
  modalFormOptions: MyFormOptions,
  handleOk: () => void,
  handleCancel: () => void,
) => [
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
    title: `${formatMessage({ id: 'app.home.detailInfo.table.footerInsurancePrice' })}`,
    dataIndex: 'footerInsurancePrice',
    key: 'footerInsurancePrice',
    render: (text: string) => (text ? <span style={{ color: '#36454f' }}>{text}</span> : '-'),
  },
  {
    title: `${formatMessage({ id: 'app.home.detailInfo.table.itemSalePrice' })}`,
    dataIndex: 'itemSalePrice',
    key: 'itemSalePrice',
    render: (text: string) => (text ? <span style={{ color: '#36454f' }}>{text}</span> : '-'),
  },
  {
    title: `${formatMessage({ id: 'app.home.detailInfo.table.finalSalePrice' })}`,
    dataIndex: 'finalSalePrice',
    key: 'finalSalePrice',
    render: (text: string) => (text ? <span style={{ color: '#36454f' }}>{text}</span> : '-'),
  },
  {
    title: `${formatMessage({ id: 'app.home.detailInfo.table.itemShareOfTaxAndIns' })}`,
    dataIndex: 'itemShareOfTaxAndIns',
    key: 'itemShareOfTaxAndIns',
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
